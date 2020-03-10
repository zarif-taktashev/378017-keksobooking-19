'use strict';

(function () {
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var pins = document.querySelector('.map__pins');

  function drawPins(response) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.pins.LIMITS; i++) {
      var elem = response[i];
      var element = pin.cloneNode(true);
      element.querySelector('img').alt = elem.offer.title;
      element.querySelector('img').src = elem.author.avatar;
      element.dataset.index = i;
      element.style.left = +elem.location.x - window.data.offsets.PIN_OFFSET_X + 'px';
      element.style.top = +elem.location.y - window.data.offsets.PIN_OFFSET_Y + 'px';
      fragment.appendChild(element);
    }
    pins.appendChild(fragment);
  }

  window.drawPins = drawPins;
})();
