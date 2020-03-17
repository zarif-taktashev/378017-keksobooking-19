'use strict';

(function () {
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var pins = document.querySelector('.map__pins');

  function draw(elem, i) {
    var element = pin.cloneNode(true);
    element.querySelector('img').alt = elem.offer.title;
    element.querySelector('img').src = elem.author.avatar;
    element.dataset.index = i;
    element.style.left = +elem.location.x - window.data.offsets.PIN_OFFSET_X + 'px';
    element.style.top = +elem.location.y - window.data.offsets.PIN_OFFSET_Y + 'px';
    return element;
  }

  function appendToMapPins(fragment) {
    pins.appendChild(fragment);
  }

  function drawPins(response) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < response.length && i < window.data.pins.LIMITS; i++) {
      var elem = response[i];
      var element = draw(elem, i);
      fragment.appendChild(element);
    }
    appendToMapPins(fragment);
  }
  window.pins = {
    appendToMapPins: appendToMapPins,
    draw: draw,
    drawPins: drawPins
  };
})();
