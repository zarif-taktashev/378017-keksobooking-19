'use strict';

(function () {
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var pins = document.querySelector('.map__pins');

  function draw(data, i) {
    var element = pin.cloneNode(true);
    element.querySelector('img').alt = data.offer.title;
    element.querySelector('img').src = data.author.avatar;
    element.dataset.index = i;
    element.style.left = +data.location.x - window.data.offsets.PIN_OFFSET_X + 'px';
    element.style.top = +data.location.y - window.data.offsets.PIN_OFFSET_Y + 'px';
    return element;
  }

  function appendToMapPins(fragment) {
    pins.appendChild(fragment);
  }

  function drawPins(response) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < response.length && i < window.data.pins.LIMITS; i++) {
      var data = response[i];
      var element = draw(data, i);
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
