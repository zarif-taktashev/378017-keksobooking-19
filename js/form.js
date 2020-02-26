'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  function enableInputs() {
    var fieldset = form.querySelectorAll('fieldset');
    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].disabled = false;
    }
  }
  function disableInputs() {
    var fieldset = form.querySelectorAll('fieldset');
    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].disabled = true;
    }
  }
  disableInputs();

  function getDynamycHorizontalPosition(elem) {
    var pageX = elem.offsetLeft;
    var bias = elem.offsetWidth / 2;
    return Math.floor(pageX + bias);
  }

  function getDynamycVerticalPosition(elem) {
    var pageY = elem.offsetTop;
    var bias = elem.offsetHeight;
    return Math.floor(pageY + bias);
  }

  function setActivAddress(evt) {
    var x = evt ? getDynamycHorizontalPosition(evt.currentTarget) : getDynamycHorizontalPosition(mainPin);
    var y = evt ? getDynamycVerticalPosition(evt.currentTarget) : getDynamycVerticalPosition(mainPin);
    addressInput.value = x.toString() + ', ' + y.toString();
  }

  setActivAddress();

  function roomValidation(evt) {
    var target = evt.target;
    if (roomNumber.value !== capacity.value) {
      target.setCustomValidity(window.data.ROOMS_RULE);
      target.reportValidity();
    } else {
      target.setCustomValidity('');
    }
  }

  roomNumber.addEventListener('change', roomValidation);
  capacity.addEventListener('change', roomValidation);

  window.form = {
    enableInputs: enableInputs,
    setActivAddress: setActivAddress
  };
})();
