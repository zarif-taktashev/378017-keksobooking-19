'use strict';

(function () {
  window.data = {};

  window.data.validationRules = {
    ROOMS_RULE: 'Количество гостей должно быть меньше комнат',
    TIME_RULE: 'Время заезда и выезда должно совподать',
    NOT_FOR_GUESTS: '100 комнат не для гостей',
    HUNDRED_GUESTS: 'Необходимо 100 комнат'
  };

  window.data.flatTypes = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  }

  window.data.offsets = {
    PIN_OFFSET_X: 25,
    PIN_OFFSET_Y: 70,
    PIN_OFFSET_Y_ACTIVE: 18,
    UPPER_BORDER: 130,
    LOWER_BOUND: 630
  };

  window.data.buttons = {
    ENTER_BUTTON: 'Enter',
    ESC_BUTTON: 'Escape',
    LEFT_MOUSE_BUTTON: 0,
    RIGHT_MOUSE_BUTTON: 2
  };

  window.data.pins = {
    LIMITS: 5
  };

  window.data.errors = {
    BUILD_TYPE: 'No such build type',
    TYPE_NOT_EXIST: 'Не существующий тип'
  };

  window.data.prices = {
    'low': '10000',
    'high': '50000'
  };

  window.tagnames = {
    IMG: 'IMG',
    BUTTON: 'BUTTON'
  };
})();
