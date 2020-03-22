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
  var NOT_FOR_GUESTS = 100;
  var DECIMAL_SYSTEM = 10;
  var invalid;

  function changeField(element) {
    if (element.disabled) {
      element.removeAttribute('disabled');
    } else {
      element.disabled = true;
    }
  }

  function changeInputs() {
    for (var i = 0; i < fieldsets.length; i++) {
      changeField(fieldsets[i]);
    }
    for (var j = 0; j < mapFilter.children.length; j++) {
      changeField(mapFilter.children[j]);
    }
  }

  function setActiveAddress(evt) {
    var x;
    var y;
    if (evt) {
      x = Math.floor(mainPin.offsetLeft + (mainPin.offsetWidth / 2));
      y = Math.floor(mainPin.offsetTop + mainPin.offsetHeight + window.data.offsets.PIN_Y_ACTIVE);
    } else {
      x = Math.floor(mainPin.offsetLeft + (mainPin.offsetWidth / 2));
      y = Math.floor(mainPin.offsetTop + (mainPin.offsetHeight / 2));
    }
    address.parentNode.disabled = true;
    address.value = x.toString() + ', ' + y.toString();
  }

  function onCheckValidation(evt) {
    var target = evt.target;
    if (roomNumber.value < capacity.value && target === roomNumber) {
      capacity.setCustomValidity(window.data.validation.ROOMS_RULE);
    } else if (roomNumber.value < capacity.value && target === capacity) {
      roomNumber.setCustomValidity(window.data.validation.ROOMS_RULE);
    } else if (target === roomNumber && parseInt(roomNumber.value, DECIMAL_SYSTEM) === NOT_FOR_GUESTS && parseInt(capacity.value, DECIMAL_SYSTEM) !== 0) {
      capacity.setCustomValidity(window.data.validation.NOT_FOR_GUESTS);
    } else if (target === capacity && parseInt(roomNumber.value, DECIMAL_SYSTEM) !== NOT_FOR_GUESTS && parseInt(capacity.value, DECIMAL_SYSTEM) === 0) {
      roomNumber.setCustomValidity(window.data.validation.HUNDRED_GUESTS);
    } else {
      roomNumber.style.border = '1px solid #d9d9d3';
      capacity.style.border = '1px solid #d9d9d3';
      capacity.setCustomValidity('');
      roomNumber.setCustomValidity('');
    }
  }

  function onCheckTime(evt) {
    var target = evt.currentTarget;
    if (timeout.value !== timein.value) {
      timeout.value = target.value;
      timein.value = target.value;
    } else {
      target.setCustomValidity('');
    }
  }

  function onCheckType(evt) {
    var target = evt.target;
    price.min = window.data.flatTypes[target.value];
    price.placeholder = window.data.flatTypes[target.value];
  }

  function onMouseHideMessage(evt) {
    if (evt.button === window.data.keys.LEFT_MOUSE_BUTTON) {
      if (document.body.querySelector('.success')) {
        document.body.querySelector('main').removeChild(succesMessage);
      } else {
        document.body.querySelector('main').removeChild(errorMessage);
      }
      document.body.removeEventListener('mousedown', onMouseHideMessage);
      document.body.removeEventListener('keydown', onKeyHideMessage);
    }
  }

  function onKeyHideMessage(evt) {
    if (evt.key === window.data.keys.ESC_BUTTON) {
      if (document.body.querySelector('.success')) {
        document.body.querySelector('main').removeChild(succesMessage);
      } else {
        document.body.querySelector('main').removeChild(errorMessage);
      }
      document.body.removeEventListener('mousedown', onMouseHideMessage);
      document.body.removeEventListener('keydown', onKeyHideMessage);
    }
  }

  function onSendData(evt) {
    evt.preventDefault();
    changeInputs();
    window.ajax.upload(new FormData(document.querySelector('.ad-form')), function (response, message) {
      if (response) {
        document.body.querySelector('main').appendChild(message);
        document.body.addEventListener('mousedown', onMouseHideMessage);
        document.body.addEventListener('keydown', onKeyHideMessage);
        window.map.makeNotActive();
      }
    });
  }

  function onResetRed(evt) {
    evt.target.style.border = '1px solid #d9d9d3';
    evt.target.removeEventListener('change', onResetRed);
    form.addEventListener('invalid', onMakeRed, true);
  }

  function onMakeRed(evt) {
    form.removeEventListener('invalid', onMakeRed, true);
    invalid = evt.target;
    evt.target.style.border = '1px solid #ff6547';
    evt.target.addEventListener('change', onResetRed);
  }

  function onResetData() {
    form.reset();
    if (invalid) {
      invalid.style.border = '1px solid #d9d9d3';
    }
    mapFilter.reset();
    window.card.removeFromMap();
    price.placeholder = '1000';
    capacity.setCustomValidity('');
    roomNumber.setCustomValidity('');
    window.map.makeNotActive();
  }

  roomNumber.addEventListener('change', onCheckValidation);
  capacity.addEventListener('change', onCheckValidation);
  type.addEventListener('change', onCheckType);
  timein.addEventListener('change', onCheckTime);
  timeout.addEventListener('change', onCheckTime);
  form.addEventListener('invalid', onMakeRed, true);
  form.addEventListener('submit', onSendData);
  reset.addEventListener('click', onResetData);

  window.form = {
    changeInputs: changeInputs,
    setActiveAddress: setActiveAddress,
  };
})();
