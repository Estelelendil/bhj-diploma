/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  static URL = '/accaunt';
  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback){
    createRequest({
      url: thisURL + '/' +id,
      callback:callback,
      method: 'GET'
    })
  }
}
