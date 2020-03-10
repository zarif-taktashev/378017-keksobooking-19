'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var type = document.querySelector('#type');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var fieldset = form.querySelectorAll('fieldset');
  var price = document.querySelector('#price');

  function enableInputs() {
    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].disabled = false;
    }
  }
  function disableInputs() {
    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].disabled = true;
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
    document.querySelector('#address').value = x.toString() + ', ' + y.toString();
  }

  function checkValidation(evt) {
    var target = evt.target;
    if (roomNumber.value !== capacity.value) {
      target.setCustomValidity(window.data.validationRules.ROOMS_RULE);
      target.reportValidity();
    } else {
      target.setCustomValidity('');
    }
  }

  function checkTime(evt) {
    var target = evt.currentTarget;
    if (timeout.value !== timein.value) {
      target.setCustomValidity(window.data.validationRules.TIME_RULE);
      target.reportValidity();
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

  roomNumber.addEventListener('change', checkValidation);
  capacity.addEventListener('change', checkValidation);
  type.addEventListener('change', checkType);
  timein.addEventListener('change', checkTime);
  timeout.addEventListener('change', checkTime);

  window.form = {
    enableInputs: enableInputs,
    setActivAddress: setActivAddress,
    disableInputs: disableInputs,
  };
})();
