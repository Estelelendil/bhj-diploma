

/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    if(!element){
      throw new Error('Элемент не найден')
    }
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
   
    const curUser = User.current();
    const select = this.element.querySelector('.accounts-select')
    if(curUser){
      Account.list(curUser, (err, response)=>{
        if(response && response.success){
          select.innerHTML = '';
        // console.log(response.data, select);
        response.data.forEach(element => {
          console.log('получение списков счетов',response)
          select.insertAdjacentHTML('beforeend', `<option value="${element.id}">${element.name}</option>`)
        });
        }

      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {

    Transaction.create(data, (err,response)=>{
      if(response && response.success){
        console.log('запрос на создание транзакции',response);
        App.update();
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
            }
    })
  }
}