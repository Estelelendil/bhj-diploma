/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const btn = document.querySelector('.sidebar-toggle');
    const body = document.querySelector('body')
    btn.onclick = function(){
      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');
    }
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const popupRegistr = document.getElementById('modal-register');
    const sideBarMenu = document.querySelector('.sidebar-menu')
    const btnEnter = Array.from(sideBarMenu.querySelectorAll('a'))[0];
    const btnRegistr = Array.from(sideBarMenu.querySelectorAll('a'))[1];
    const btnExit = Array.from(sideBarMenu.querySelectorAll('a'))[2];
    console.log(btnExit)
    
    btnRegistr.onclick = function() {
      console.log(App.getModal('register'));  
      App.getModal('register').open();
    }

    btnEnter.onclick = function() {
      // console.log(App.getModal('login'));  
      App.getModal('login').open();
    }

    btnExit.onclick = function() {
      console.log(App.getModal('register'));  
      User.logout(()=>{
        App.setState( 'init' );
      })
    }

// При нажатии на кнопку «Регистрация» необходимо открыть окно #modal-register (предварительно найдя его через App.getModal) с помощью метода Modal.open()
// При нажатии на кнопку «Войти» необходимо открыть окно #modal-login (предварительно найдя его через App.getModal) с помощью метода Modal.open()
// При нажатии на кнопку «Выйти» необходимо вызвать метод User.logout и после успешного выхода (response.success = true), нужно вызвать App.setState( 'init' )
  }
}