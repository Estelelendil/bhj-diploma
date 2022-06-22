// const { response } = require("express");

/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return JSON.parse(localStorage.getItem('user'))|| undefined;
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    createRequest({
      url: URL + '/current',
      data: this.current(),
      method: 'GET',
      callback: (err, response) =>{

        if(response && response.success){
          this.setCurrent(response.user);
        }
        else if(response && !response.success){
          this.unsetCurrent();
        }
        callback(err, response);
      }
    })
    
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
  createRequest({
    url: URL + '/register',
    data: data,
    callback: (err, response) =>{
      if(response && response.success){
        this.setCurrent(response.user)
      }
      if(response && !response.success){
        alert(response.error);
      }
      callback(err, response);
    },
    method: "POST"
  })
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      url: URL + '/logout',
      callback: (err, response)=>{
        if(response && response.success){
          this.unsetCurrent();
        }
        callback(err, response);
      },
      method: 'POST'
    })
  }
}

const user = {
  id: 12,
  name: 'Vlad'
};

// User.setCurrent( user );

// console.log( localStorage.user ); // строка "{"id":12,"name":"Vlad"}

// User.setCurrent( user );
// let current = User.current();

// console.log( current ); // объект { id: 12, name: 'Vlad' }

// User.unsetCurrent();

// current = User.current();
// console.log( current ); // undefined