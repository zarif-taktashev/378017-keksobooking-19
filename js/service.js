'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var SEND_URL = 'https://js.dump.academy/keksobooking';
  var OK = 200;
  var BAD_REQUEST = 400;
  var UNAUTHORIZED = 401;
  var NOT_FOUND = 404;
  var TIMEOUT = 10000;
  var succesMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');

  function checkResponse(xhr) {
    var error;
    switch (xhr.status) {
      case OK:
        break;

      case BAD_REQUEST:
        error = 'Неверный запрос';
        break;

      case UNAUTHORIZED:
        error = 'Пользователь не авторизован';
        break;

      case NOT_FOUND:
        error = 'Ничего не найдено';
        break;

      default:
        error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
    }
    return error;
  }

  function service(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responsType = 'json';
    xhr.addEventListener('load', function () {
      var error = checkResponse(xhr);
      if (error) {
        onError(error);
      } else {
        onSuccess(JSON.parse(xhr.response));
      }
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', URL);
    xhr.send();
  };

  function upload(data, callBack) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      var error = checkResponse(xhr);
      if (error) {
        callBack(error, errorMessage);
      } else {
        callBack(JSON.parse(xhr.response), succesMessage);
      }
    });

    xhr.timeout = TIMEOUT;

    xhr.open('POST', SEND_URL, true);
    xhr.send(data);
  };

  window.ajax = {
    upload: upload,
    service: service
  }
})();
