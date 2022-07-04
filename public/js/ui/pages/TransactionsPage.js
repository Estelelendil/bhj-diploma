

/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {// Какой элемент мы передаем? конкретный счет?
this.element = element;
if(!element){
  throw new Error('Элемент не найден');
}
this.registerEvents()
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    // let lastOptions;
    //Для работы метода update следует сохранить options в свойство lastOptions.блядь, что?!
    this.render();// что передаем? откуда объект с Id?????
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    let btnRemoveAccaunt = this.element.querySelector('.remove-account');
      btnRemoveAccaunt.onclick = ()=>{
        console.log('кусь')
        this.removeAccount();
    }
    let btnsRemoveTrancaction = this.element.querySelectorAll('.transaction__remove');
    console.log('Нашлись ли кнопки удаления транзакций?', btnsRemoveTrancaction)
      btnsRemoveTrancaction.forEach((element)=>{element.addEventListener('click', (e)=>{
          e.preventDefault();
          console.log('кусь кусь')
          this.removeTransaction(e.target.dataset.id);//индентификатор транзакции?
        });
      })

  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    // Если свойство lastOptions (см. метод render) не задано, метод не должен ничего делать.
    if(window.confirm('Вы действительно хотите удалить счет?') && this.lastOptions){
      debugger
      Account.remove({id:this.lastOptions.account_id}, (err, response)=>{
        if(response && response.success){
          console.log('Ответ на запрос на удаление', response)
          App.updateWidgets();
          App.updateForms();
        }
      });
      this.clear();
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    if(window.confirm('Вы действительно хотите удалить эту транзакцию?')){
      Transaction.remove({id:id}, (err, response)=>{// опять же откуда дата?
        if(response && response.success){
          App.update();
        }
      })
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){//принимает объект с id(один или несколько?)
  
    console.log('id счета?',options);
     this.lastOptions = options;
    if(!this.lastOptions){
      return;
    }
    Account.get(options.account_id, (err, response)=>{
      if(response && response.success){
        console.log('получение счета по Id',response);
        this.renderTitle(response.data.name);// строка
        Transaction.list(options,(err,response) =>{
          if(response && response.success){
            console.log('запрос на список транзакций по счету',response)
            this.renderTransactions(response.data)
            this.registerEvents();
          }
        })
      }
    });
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = '';
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    let contentTitle = this.element.querySelector('.content-title');
    contentTitle.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(inputDate){
    const date = new Date(Date.parse(inputDate));
    const dateString = date.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    
    const timeString =  date.toLocaleTimeString("ru-RU", {
      hour: "numeric",
      minute: "numeric"
    });
    return  `${dateString} в ${timeString}` ;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    // console.log('ITEM', item)
    const newHTML = document.createElement('div');
    newHTML.classList.add('transaction', `transaction_${item.type}`, 'row');
    newHTML.innerHTML = `<div class="col-md-7 transaction__details">
    <div class="transaction__icon">
        <span class="fa fa-money fa-2x"></span>
    </div>
    <div class="transaction__info">
        <h4 class="transaction__title">${item.name}</h4>
        
        <div class="transaction__date">${this.formatDate(item.created_at)}</div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="transaction__summ">
    
    ${item.sum} <span class="currency">₽</span>
    </div>
  </div>
  <div class="col-md-2 transaction__controls">
      
      <button class="btn btn-danger transaction__remove" data-id="${item.id}">
          <i class="fa fa-trash"></i>  
      </button>
  </div>`
  return newHTML;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){// массив объектов для каждой транзакции
    console.log('массив данных о транзакциях', data)
    let content = this.element.querySelector('.content')
    content.innerHTML = ''
    data.forEach(element =>{
      content.insertAdjacentElement('afterbegin', this.getTransactionHTML(element))
    })
  }
}