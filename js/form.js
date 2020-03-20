'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var type = document.querySelector('#type');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var fieldsets = form.querySelectorAll('fieldset');
  var mapFilter = document.querySelector('.map__filters');
  var price = document.querySelector('#price');
  var address = document.querySelector('#address');
  var reset = document.querySelector('.ad-form__reset');
  var succesMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');

  function enableInputs() {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }
    for (var j = 0; j < mapFilter.children.length; j++) {
      mapFilter.children[j].disabled = false;
    }
  }
  function disableInputs() {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = true;
    }
    for (var j = 0; j < mapFilter.children.length; j++) {
      mapFilter.children[j].disabled = true;
    }
  }

  function setActivAddress(evt) {
    var x;
    var y;
    if (evt) {
      x = Math.floor(evt.currentTarget.offsetLeft + (evt.currentTarget.offsetWidth / 2));
      y = Math.floor(evt.currentTarget.offsetTop + evt.currentTarget.offsetHeight + window.data.offsets.PIN_OFFSET_Y_ACTIVE);
    } else {
      x = Math.floor(mainPin.offsetLeft + (mainPin.offsetWidth / 2));
      y = Math.floor(mainPin.offsetTop + (mainPin.offsetHeight / 2));
    }
    address.parentNode.disabled = true;
    address.value = x.toString() + ', ' + y.toString();
  }

  function checkValidation(evt) {
    var target = evt.target;
    if (roomNumber.value < capacity.value) {
      target === roomNumber ? capacity.setCustomValidity(window.data.validationRules.ROOMS_RULE) : roomNumber.setCustomValidity(window.data.validationRules.ROOMS_RULE);
    } else if(target === roomNumber && parseInt(roomNumber.value, 10) === 100 && parseInt(capacity.value, 10) !== 0) {
      capacity.setCustomValidity(window.data.validationRules.NOT_FOR_GUESTS);
    } else if(target === capacity && parseInt(roomNumber.value, 10) !== 100 && parseInt(capacity.value, 10) === 0) {
      roomNumber.setCustomValidity(window.data.validationRules.HUNDRED_GUESTS);
    } else {
      target.setCustomValidity('');
    }
  }

  function checkTime(evt) {
    var target = evt.currentTarget;
    if (timeout.value !== timein.value) {
      timeout.value = target.value;
      timein.value = target.value;
    } else {
      target.setCustomValidity('');
    }
  }

  function checkType(evt) {
    var target = evt.target;
    switch (target.value) {
      case 'bungalo':
        price.min = 0;
        price.placeholder = '0';
        break;
      case 'flat':
        price.min = 1000;
        price.placeholder = '1000';
        break;
      case 'house':
        price.min = 5000;
        price.placeholder = '5000';
        break;
      case 'palace':
        price.min = 10000;
        price.placeholder = '10000';
        break;
      default:
        throw new Error(window.data.errors.TYPE_NOT_EXIST);
    }
  }

  function hideMessage(evt) {
    if (evt.button === window.data.buttons.LEFT_MOUSE_BUTTON || evt.key === window.data.buttons.ESC_BUTTON) {
      if (document.body.querySelector('.success')) {
        document.body.querySelector('main').removeChild(succesMessage);
      } else {
        document.body.querySelector('main').removeChild(errorMessage);
      }
      document.body.removeEventListener('mousedown', hideMessage);
      document.body.removeEventListener('keydown', hideMessage);
    }
  }

  function sendData(evt) {
    evt.preventDefault();
    enableInputs();
    window.upload(new FormData(document.querySelector('.ad-form')), function (response, message) {
      if (response) {
        document.body.querySelector('main').appendChild(message);
        document.body.addEventListener('mousedown', hideMessage);
        document.body.addEventListener('keydown', hideMessage);
        window.map.makeNotActive();
      }
    });
  }

  function resetRed(evt) {
    evt.target.style.border = '1px solid #d9d9d3';
    evt.target.removeEventListener('change', resetRed);
    form.addEventListener('invalid', makeRed, true);
  }

  function makeRed(evt) {
    form.removeEventListener('invalid', makeRed, true);
    evt.target.style.border = '1px solid #ff6547';
    evt.target.addEventListener('change', resetRed);
  }

  function resetData() {
    form.reset();
    mapFilter.reset();
    window.map.makeNotActive();
  }

  roomNumber.addEventListener('change', checkValidation);
  capacity.addEventListener('change', checkValidation);
  type.addEventListener('change', checkType);
  timein.addEventListener('change', checkTime);
  timeout.addEventListener('change', checkTime);
  form.addEventListener('invalid', makeRed, true);
  form.addEventListener('submit', sendData);
  reset.addEventListener('click', resetData);

  window.form = {
    enableInputs: enableInputs,
    setActivAddress: setActivAddress,
    disableInputs: disableInputs,
  };
})();
