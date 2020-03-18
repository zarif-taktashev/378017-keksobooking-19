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
    mainPin.addEventListener('keydown', makeActive);
  }
  makeNotActive();

  function makeActive(evt) {
    evt.preventDefault();
    mainPin.removeEventListener('mousedown', makeActive);
    mainPin.removeEventListener('keydown', makeActive);
    mainPin.addEventListener('mousedown', putPin);
    if (evt.button === window.data.buttons.LEFT_MOUSE_BUTTON || evt.key === window.data.buttons.ENTER_BUTTON || evt.button === window.data.buttons.RIGHT_MOUSE_BUTTON) {
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

    function deleteListeners() {
      mapPinsContainer.removeEventListener('mousemove', onMouseMove);
      mainPin.removeEventListener('mousemove', deleteListeners);
    }

    mapPinsContainer.addEventListener('mousemove', onMouseMove);
    mapPinsContainer.addEventListener('mouseup', deleteListeners);
  }

  function showCard(evt) {
    if (evt.button === window.data.buttons.LEFT_MOUSE_BUTTON || evt.key === window.data.buttons.ENTER_BUTTON) {
      var target = evt.target;
      if (document.querySelector('.map__pin.map__pin--active')) {
        document.querySelector('.map__pin.map__pin--active').classList.remove('map__pin--active');
      }
      if (target.tagName === window.tagnames.IMG && !target.parentElement.classList.contains('map__pin--main')) {
        target.parentElement.classList.add('map__pin--active');
        window.card.drawCards(window.dataBase[target.parentElement.dataset.index]);
      } else if (target.tagName === window.tagnames.BUTTON && !target.classList.contains('map__pin--main')) {
        target.classList.add('map__pin--active');
        window.card.drawCards(window.dataBase[target.dataset.index]);
      }
    }
  }

  mainPin.addEventListener('dragstart', function () {
    return false;
  });

  mapPinsContainer.addEventListener('mousedown', showCard);
  mapPinsContainer.addEventListener('keydown', showCard);
  window.map = {
    makeNotActive: makeNotActive,
    hidePins: hidePins
  };
})();
