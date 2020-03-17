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
  window.service = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responsType = 'json';
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case OK:
          onSuccess(JSON.parse(xhr.response));
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

      if (error) {
        onError(error);
      }
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', URL);
    xhr.send();
  };

  window.upload = function (data, callBack) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case OK:
          callBack(JSON.parse(xhr.response), succesMessage);
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

      if (error) {
        callBack(error, errorMessage);
      }
    });

    xhr.timeout = TIMEOUT;

    xhr.open('POST', SEND_URL, true);
    xhr.send(data);
  };
})();
