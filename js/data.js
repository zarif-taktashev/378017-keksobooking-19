'use strict';

(function () {
  window.service(function (response) {
    window.dataBase = response;
  });

  window.data = {};

  window.data.validationRules = {
    ROOMS_RULE: 'Количество гостей и комнат должно совподать',
    TIME_RULE: 'Время заезда и выезда должно совподать'
  };

  window.data.offsets = {
    PIN_OFFSET_X: 25,
    PIN_OFFSET_Y: 70,
    PIN_OFFSET_Y_ACTIVE: 18
  };

  window.data.buttons = {
    ENTER_BUTTON: 'Enter',
    ESC_BUTTON: 'Escape',
    LEFT_MOUSE_BUTTON: 0
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
