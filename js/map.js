'use strict';

(function () {
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var pins = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');

  function drawPins() {
    var fragment = document.createDocumentFragment();
    var elements = pin;
    for (var i = 0; i < 8; i++) {
      var elem = window.createPins(i);
      var element = elements.cloneNode(true);
      element.querySelector('img').alt = elem.offer.title;
      element.querySelector('img').src = elem.author.avatar;
      element.style.left = +elem.location.x + window.data.PIN_OFFSET_X + 'px';
      element.style.top = +elem.location.y - window.data.PIN_OFFSET_Y + 'px';
      fragment.appendChild(element);
    }
    pins.appendChild(fragment);
  }

  function makeActive(evt) {
    if (evt.button === window.data.LEFT_MOUSE_BUTTON || evt.key === window.data.ENTER_BUTTON) {
      document.querySelector('.map').classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
      window.form.enableInputs();
      drawPins();
      window.form.setActivAddress(evt);
    }
    mainPin.removeEventListener('mousedown', makeActive);
  }
  mainPin.addEventListener('mousedown', makeActive);
  mainPin.addEventListener('keydown', makeActive);
})();
