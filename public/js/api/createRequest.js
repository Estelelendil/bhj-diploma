/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest
  xhr.responseType = 'json';
  
  xhr.addEventListener('error',(e)=>{

    options.callback(e, xhr.response);
  })

  xhr.onreadystatechange = function() {
    if (this.readyState === xhr.DONE) {
      options.callback(null, xhr.response);
    }
  }

  if (options.method === 'GET'){
    let fullURL = options.url + '?';
    for (prop in options.data) {
      fullURL += `${prop}=${options.data[prop]}&`
    }

    xhr.open(options.method, fullURL.slice(0, fullURL.length - 1))
    xhr.send()
  } 
  else {
    formData = new FormData;
    console.log('данные формы', options)
    for (prop in options.data) {
      formData.append( prop, options.data[prop] );
    }
    xhr.open(options.method, options.url );
    // console.log(formData)
    xhr.send( formData );
  }
};
