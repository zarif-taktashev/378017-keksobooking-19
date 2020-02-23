'use strict';

(function () {
  var PIN_OFFSET_X = 25;
  var PIN_OFFSET_Y = 70;
  var ENTER_BUTTON = 'Enter';
  var LEFT_MOUSE_BUTTON = 0;
  var ROOMS_RULE = 'Количество гостей и комнат должно совподать';
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  function createAvatarNumber(i) {
    return i < 10 ? '0' + (i + 1) : i + 1;
  }

  function getRandomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  function getRandomArray(array) {
    var randomArray = [];
    for (var i = 0; i <= getRandomInteger(0, array.length - 1); i++) {
      randomArray.push(array[i]);
    }
    return randomArray;
  }

  window.data = {
    PIN_OFFSET_X: PIN_OFFSET_X,
    PIN_OFFSET_Y: PIN_OFFSET_Y,
    ENTER_BUTTON: ENTER_BUTTON,
    LEFT_MOUSE_BUTTON: LEFT_MOUSE_BUTTON,
    ROOMS_RULE: ROOMS_RULE,
    TIMES: TIMES,
    FEATURES: FEATURES,
    TYPE: TYPE,
    PHOTOS: PHOTOS,
    createAvatarNumber: createAvatarNumber,
    getRandomInteger: getRandomInteger,
    getRandomArray: getRandomArray
  };
})();
