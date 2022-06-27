

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
    // this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    console.trace('kus')
    const curUser = User.current();
    const select = this.element.querySelector('.accounts-select')
    if(curUser){
      Account.list(curUser, (err, response)=>{
        if(response && response.success){
          select.innerHTML = '';
        // console.log(response.data, select);
        response.data.forEach(element => {
        
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
       
        App.update(response);
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
            }
    })
  }
}