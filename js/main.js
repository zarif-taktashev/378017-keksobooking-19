'use strict';

var mainPin = document.querySelector('.map__pin--main');
var MAIN_PIN_WIDTH = Math.floor(mainPin.offsetWidth);
var MAIN_PIN_HEIGHT = Math.floor(mainPin.offsetHeight);
var CALCULUS_SYSTEM = 10;
var MAIN_PIN_LEFT = parseInt(mainPin.style.left, CALCULUS_SYSTEM);
var MAIN_PIN_TOP = parseInt(mainPin.style.top, CALCULUS_SYSTEM);
var PIN_OFFSET_X = 25;
var PIN_OFFSET_Y = 70;
var ENTER_BUTTON = 'Enter';
var LEFT_MOUSE_BUTTON = 0;
var ROOMS_RULE = 'Количество гостей и комнат должно совподать';
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var form = document.querySelector('.ad-form');
var pins = document.querySelector('.map__pins');
var addressInput = document.querySelector('#address');
var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var type = ['palace', 'flat', 'house', 'bungalo'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

function createAvatarNumber(i) {
  return i < 10 ? '0' + (i + 1) : i + 1;
}

function getRandomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function getRandomArray(array) {
  var randpmArray = [];
  for (var i = 0; i <= getRandomInteger(0, array.length - 1); i++) {
    randpmArray.push(array[i]);
  }
  return randpmArray;
}

function createOffer(i) {
  var offer =
  {
    author: {
      avatar: 'img/avatars/user' + createAvatarNumber(i) + '.png'
    },
    offer: {
      title: 'Title ' + i,
      address: function () {
        return this.location.x.toString() + this.location.y.toString();
      },
      price: getRandomInteger(100, 1000),
      type: type[getRandomInteger(0, 3)],
      rooms: getRandomInteger(1, 4),
      guests: getRandomInteger(1, 4),
      checkin: times[getRandomInteger(0, 2)],
      checkout: times[getRandomInteger(0, 2)],
      features: getRandomArray(features),
      description: 'description' + i,
      photos: getRandomArray(photos),
    },
    location: {
      x: getRandomInteger(100, 1100),
      y: getRandomInteger(130, 630)
    }
  };

  return offer;
}

function drawPins() {
  var fragment = document.createDocumentFragment();
  var elements = document.querySelector('#pin').content.querySelector('.map__pin');
  for (var i = 0; i < 8; i++) {
    var elem = createOffer(i);
    var element = elements.cloneNode(true);
    element.querySelector('img').alt = elem.offer.title;
    element.querySelector('img').src = elem.author.avatar;
    element.style.left = +elem.location.x + PIN_OFFSET_X + 'px';
    element.style.top = +elem.location.y - PIN_OFFSET_Y + 'px';
    fragment.appendChild(element);
  }
  pins.appendChild(fragment);
}

// это для следующего задания пожалуйста не обращайте внимания

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

function makeActive(evt) {
  if (evt.button === LEFT_MOUSE_BUTTON || evt.key === ENTER_BUTTON) {
    document.querySelector('.map').classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    enableInputs();
    drawPins();
    setActivAddress(evt);
  }
  mainPin.removeEventListener('mousedown', makeActive);
}
mainPin.addEventListener('mousedown', makeActive);
mainPin.addEventListener('keydown', makeActive);

function roomValidation(evt) {
  var target = evt.target;
  if (roomNumber.value !== capacity.value) {
    target.setCustomValidity(ROOMS_RULE);
    target.reportValidity();
  } else {
    target.setCustomValidity('');
  }
}

roomNumber.addEventListener('change', roomValidation);
capacity.addEventListener('change', roomValidation);
