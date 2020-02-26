'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');

  function makeActive(evt) {
    if (evt.button === window.data.LEFT_MOUSE_BUTTON || evt.key === window.data.ENTER_BUTTON) {
      document.querySelector('.map').classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
      window.service(function (response) {
        window.drawPins(response);
      });
      window.form.enableInputs();
      window.form.setActivAddress(evt);
    }
    mainPin.removeEventListener('mousedown', makeActive);
  }
  mainPin.addEventListener('mousedown', makeActive);
  mainPin.addEventListener('keydown', makeActive);
})();
