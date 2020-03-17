'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var mapPinsContainer = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var mapOffsetLeft = map.offsetLeft;
  var mapOffsetHeight = map.offsetHeight;
  var mapOffsetTop = map.offsetTop;
  var mapOffsetWidth = map.offsetWidth;
  var mainPinOffsetWidth = mainPin.offsetWidth;
  var mainPinOffsetHeight = mainPin.offsetHeight;

  function hidePins() {
    var pins = document.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        mapPinsContainer.removeChild(pins[i]);
      }
    }
  }

  function resetPin() {
    mainPin.style.top = mapOffsetHeight / 2 + 'px';
    mainPin.style.left = mapOffsetWidth / 2 - mainPinOffsetWidth / 2 + 'px';
    hidePins();
  }

  function makeNotActive() {
    form.reset();
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    window.form.disableInputs();
    resetPin();
    window.form.setActivAddress();
    mainPin.addEventListener('mousedown', makeActive);
  }
  makeNotActive();

  function makeActive(evt) {
    mainPin.removeEventListener('mousedown', makeActive);
    mainPin.addEventListener('mousedown', putPin);
    if (evt.button === window.data.buttons.LEFT_MOUSE_BUTTON || evt.key === window.data.buttons.ENTER_BUTTON) {
      map.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
      window.pins.drawPins(window.dataBase);
      window.form.enableInputs();
      window.form.setActivAddress(evt);
    }
  }

  function putPin(evt) {
    evt.preventDefault();
    mainPin.style.position = 'absolute';
    mainPin.style.zIndex = 1000;
    moveAt(evt.offsetLeft, evt.offsetTop);

    function moveAt(pageX, pageY) {
      if (pageX - mapOffsetLeft - mainPinOffsetWidth / 2 > 0) {
        mainPin.style.left = pageX - mapOffsetLeft - mainPinOffsetWidth / 2 + 'px';
        mainPin.style.top = pageY - mapOffsetTop - mainPinOffsetHeight / 2 + 'px';
      }
      if (pageY - mapOffsetTop - mainPinOffsetHeight / 2 <= 0) {
        mainPin.style.top = 0 + 'px';
      }
      if (pageX - mapOffsetLeft - mainPinOffsetWidth / 2 <= 0) {
        mainPin.style.left = 0 + 'px';
      }
      if (pageX - mapOffsetLeft + mainPinOffsetWidth / 2 >= mapOffsetWidth) {
        mainPin.style.left = mapOffsetWidth - mainPinOffsetWidth + 'px';
      }
      if (pageY + mainPinOffsetWidth / 2 + window.data.offsets.PIN_OFFSET_Y_ACTIVE >= mapOffsetHeight) {
        mainPin.style.top = mapOffsetHeight - mainPinOffsetHeight - window.data.offsets.PIN_OFFSET_Y_ACTIVE + 'px';
      }

      window.form.setActivAddress();
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    mapPinsContainer.addEventListener('mousemove', onMouseMove);
    mapPinsContainer.addEventListener('mouseover', function () {
      mapPinsContainer.removeEventListener('mousemove', onMouseMove);
      mainPin.onmouseup = null;
    });
    mainPin.addEventListener('mouseup', function () {
      mapPinsContainer.removeEventListener('mousemove', onMouseMove);
      mainPin.onmouseup = null;
    });

  }

  function showCard(evt) {
    if (evt.button === window.data.buttons.LEFT_MOUSE_BUTTON) {
      var target = evt.target;
      if (target.tagName === window.tagnames.IMG && !target.parentElement.classList.contains('map__pin--main')) {
        window.card.drawCards(window.dataBase[target.parentElement.dataset.index]);
      } else if (target.tagName === window.tagnames.BUTTON && !target.classList.contains('map__pin--main')) {
        window.card.drawCards(window.dataBase[target.dataset.index]);
      }
    }
  }

  mainPin.addEventListener('mousedown', makeActive);
  mainPin.addEventListener('dragstart', function () {
    return false;
  });
  mainPin.addEventListener('keydown', makeActive);
  mapPinsContainer.addEventListener('mousedown', showCard);

  window.map = {
    makeNotActive: makeNotActive,
    hidePins: hidePins
  };
})();
