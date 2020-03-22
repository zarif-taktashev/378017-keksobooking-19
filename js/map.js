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
    mainPin.addEventListener('mousedown', onMouseMakeActive);
    mainPin.addEventListener('keydown', onKeyMakeActive);
  }
  makeNotActive();

  function onKeyMakeActive(evt) {
    evt.preventDefault();
    mainPin.removeEventListener('mousedown', onMouseMakeActive);
    mainPin.removeEventListener('keydown', onKeyMakeActive);
    mainPin.addEventListener('mousedown', onPutPin);
    if (evt.button === window.data.buttons.RIGHT_MOUSE_BUTTON) {
      map.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
      window.ajax.service(function (response) {
        window.dataBase = response;
        window.pins.drawPins(response);
        window.form.enableInputs();
        window.form.setActivAddress(evt);
      });
    }
  }

  function onMouseMakeActive(evt) {
    evt.preventDefault();
    mainPin.removeEventListener('mousedown', onMouseMakeActive);
    mainPin.removeEventListener('keydown', onKeyMakeActive);
    mainPin.addEventListener('mousedown', onPutPin);
    if (evt.button === window.data.buttons.LEFT_MOUSE_BUTTON || evt.button === window.data.buttons.RIGHT_MOUSE_BUTTON) {
      map.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
      window.ajax.service(function (response) {
        window.dataBase = response;
        window.pins.drawPins(response);
        window.form.enableInputs();
        window.form.setActivAddress(evt);
      });
    }
  }

  function onPutPin(evt) {
    evt.preventDefault();
    mainPin.style.position = 'absolute';
    mainPin.style.zIndex = 1000;
    moveAt(evt.offsetLeft, evt.offsetTop);

    function moveAt(pageX, pageY) {
      if (pageX - mapOffsetLeft - mainPinOffsetWidth / 2 > 0) {
        mainPin.style.left = pageX - mapOffsetLeft - mainPinOffsetWidth / 2 + 'px';
        mainPin.style.top = pageY - mapOffsetTop - mainPinOffsetHeight / 2 + 'px';
      }
      if (pageY - mapOffsetTop - mainPinOffsetHeight / 2 <= window.data.offsets.UPPER_BORDER - mainPinOffsetHeight / 2) {
        mainPin.style.top = window.data.offsets.UPPER_BORDER - mainPinOffsetHeight / 2 + 'px';
      }
      if (pageX - mapOffsetLeft - mainPinOffsetWidth / 2 <= 0) {
        mainPin.style.left = 0 + 'px';
      }
      if (pageX - mapOffsetLeft + mainPinOffsetWidth / 2 >= mapOffsetWidth) {
        mainPin.style.left = mapOffsetWidth - mainPinOffsetWidth + 'px';
      }
      if (pageY + mainPin.offsetHeight / 2 + window.data.offsets.PIN_OFFSET_Y_ACTIVE >= window.data.offsets.LOWER_BOUND) {
        mainPin.style.top = window.data.offsets.LOWER_BOUND - mainPin.offsetHeight - window.data.offsets.PIN_OFFSET_Y_ACTIVE + 'px';
      }

      var x = Math.floor(mainPin.offsetLeft + (mainPin.offsetWidth / 2));
      var y = Math.floor(mainPin.offsetTop + mainPin.offsetHeight + window.data.offsets.PIN_OFFSET_Y_ACTIVE);
      address.value = x.toString() + ', ' + y.toString();
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function onDeleteListeners() {
      mapPinsContainer.removeEventListener('mousemove', onMouseMove);
      mainPin.removeEventListener('mousemove', onDeleteListeners);
      mapPinsContainer.removeEventListener('mouseup', onDeleteListeners);
    }

    mapPinsContainer.addEventListener('mousemove', onMouseMove);
    mapPinsContainer.addEventListener('mouseup', onDeleteListeners);
  }

  function onShowCard(evt) {
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

  mapPinsContainer.addEventListener('mousedown', onShowCard);
  mapPinsContainer.addEventListener('keydown', onShowCard);
  window.map = {
    makeNotActive: makeNotActive,
    hidePins: hidePins
  };
})();
