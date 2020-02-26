'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  window.service = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responsType = 'json';
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onSuccess(JSON.parse(xhr.response));
          break;

        case 400:
          error = 'Неверный запрос';
          break;

        case 401:
          error = 'Пользователь не авторизован';
          break;

        case 404:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    // xhr.addEventListener('load', function () {
    //   onError('Произошла ошибка соединения');
    // });

    // xhr.addEventListener('timeout', function () {
    //   onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    // });

    xhr.timeout = 1000;

    xhr.open('GET', URL);
    xhr.send();
  };
})();
