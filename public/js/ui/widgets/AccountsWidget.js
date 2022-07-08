/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if(!element){
      throw new Error('Элемент не передан');
    }
    this.element = element;
    this.registerEvents();
    this.update()

  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const btn = this.element.querySelector('.create-account');
    btn.onclick = () => {
      App.getModal('createAccount').open();
    }
    const existingAccounts = Array.from(this.element.querySelectorAll('.account a'));
    existingAccounts.forEach(elem =>elem.onclick = () => this.onSelectAccount(elem));
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const curUser = User.current();
    if(curUser){
      Account.list(curUser, (err, response)=>{
        if(response && response.success){
          // console.log(response)
          this.clear()
          this.renderItem(response.data)
        }
      });
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accounts = this.element.querySelectorAll('.account');
    accounts.forEach(elem => elem.parentNode.removeChild(elem));
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    let curActiveElement = this.element.querySelector('.active');
    if(curActiveElement){

      curActiveElement.classList.remove('active');
    }
    element.classList.add('active');
    console.log('ожидаем id',element)
    App.showPage( 'transactions', { account_id: element.dataset.id });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    return `<li class="account" data-id='${item.id}'>
    <a href="#" data-id='${item.id}'>
        <span>${item.name}</span> /
        <span>${item.sum}</span>
    </a>
</li>`
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){//data массив объектов счетов
    const accountsHtml = data.map((item)=>{//массив строк разметка каждого счета
      return this.getAccountHTML(item);
    })
    accountsHtml.forEach(elem => this.element.insertAdjacentHTML('beforeend', elem));
    this.registerEvents();
  }
}
