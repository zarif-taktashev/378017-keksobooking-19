'use strict';

(function () {
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var pins = document.querySelector('.map__pins');

  function drawPins(response) {
    var fragment = document.createDocumentFragment();
    var elements = pin;
    // for (var i = 0; i < response.length; i++) {
    //   var elem = response[i];
    //   var element = elements.cloneNode(true);
    //   element.querySelector('img').alt = elem.offer.title;
    //   element.querySelector('img').src = elem.author.avatar;
    //   element.style.left = +elem.location.x - window.data.PIN_OFFSET_X + 'px';
    //   element.style.top = +elem.location.y - window.data.PIN_OFFSET_Y + 'px';
    //   fragment.appendChild(element);
    // }
    response.
      filter(function (item, index) {
        return index < 5;
      }).
      forEach(function (item) {
        var elem = item;
        var element = elements.cloneNode(true);
        element.querySelector('img').alt = elem.offer.title;
        element.querySelector('img').src = elem.author.avatar;
        element.style.left = +elem.location.x - window.data.PIN_OFFSET_X + 'px';
        element.style.top = +elem.location.y - window.data.PIN_OFFSET_Y + 'px';
        fragment.appendChild(element);
      });
    pins.appendChild(fragment);
  }

  window.drawPins = drawPins;
})();
