/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    this.element = element;
    this.registerEvents();
  }

  /**
   * Необходимо запретить отправку формы и в момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    this.element.addEventListener('submit', (e)=>{
      e.preventDefault();
      this.submit();
    })
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    let inputs = Array.from(this.element.querySelectorAll('input'));
    // inputs.forEach(item =>{result[item.name]= item.value})
    let select = this.element.querySelector('select')
    const result = {};
    if(select){
      result[select.name]= select.value; 
    }

    for (const input of inputs) {
      const { name, value} = input;
      result[name] = value;
    }

    // const result = inputs.reduce((acc, item) => {
    //   acc[item.name] = item.value;
    //   return acc;
    // }, {});

    return result;
  }

  onSubmit(options){

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    this.onSubmit(this.getData())
  }
}