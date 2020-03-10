'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var mapPinsContainer = document.querySelector('.map__pins');
  var map = document.querySelector('.map');

  function makeNotActive() {
    window.form.disableInputs();
    window.form.setActivAddress();
  }
  makeNotActive();

  function makeActive(evt) {
    mainPin.removeEventListener('mousedown', makeActive);
    mainPin.addEventListener('mousedown', putPin);
    if (evt.button === window.data.buttons.LEFT_MOUSE_BUTTON || evt.key === window.data.buttons.ENTER_BUTTON) {
      document.querySelector('.map').classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
      window.drawPins(window.dataBase);
      window.form.enableInputs();
      window.form.setActivAddress(evt);
    }
  }

  function putPin(evt) {
    evt.preventDefault();
    evt.currentTarget.style.position = 'absolute';
    evt.currentTarget.style.zIndex = 1000;
    moveAt(evt.pageX, evt.pageY);

    function moveAt(pageX, pageY) {
      mainPin.style.left = pageX - mainPin.offsetWidth / 2 + 'px';
      mainPin.style.top = (pageY - mainPin.offsetHeight / 2) + window.data.offsets.PIN_OFFSET_Y_ACTIVE + 'px';
      window.form.setActivAddress();
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    map.addEventListener('mousemove', onMouseMove);
    mainPin.addEventListener('mouseup', function () {
      map.removeEventListener('mousemove', onMouseMove);
      mainPin.onmouseup = null;
    });

  }

  function showCard(evt) {
    if (evt.button === window.data.buttons.LEFT_MOUSE_BUTTON) {
      var target = evt.target;
      if (target.tagName === window.tagnames.IMG && !target.parentElement.classList.contains('map__pin--main')) {
        window.drawCards(window.dataBase[target.parentElement.dataset.index]);
      } else if (target.tagName === window.tagnames.BUTTON && !target.classList.contains('map__pin--main')) {
        window.drawCards(window.dataBase[target.dataset.index]);
      }
    }
  }

  mainPin.addEventListener('mousedown', makeActive);
  mainPin.addEventListener('dragstart', function () {
    return false;
  });
  mainPin.addEventListener('keydown', makeActive);
  mapPinsContainer.addEventListener('mousedown', showCard);
})();
