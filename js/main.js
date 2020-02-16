'use strict';

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

var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var type = ['palace', 'flat', 'house', 'bungalo'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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
      x: getRandomInteger(100, 600),
      y: getRandomInteger(130, 630)
    }
  };

  return offer;
}

function drowPins() {
  var fragment = document.createDocumentFragment();
  var pins = document.querySelector('.map__pins');
  var elements = document.querySelector('#pin').content.querySelector('.map__pin');
  for (var i = 0; i < 8; i++) {
    var elem = createOffer(i);
    var element = elements.cloneNode(true);
    element.querySelector('img').alt = elem.offer.title;
    element.querySelector('img').src = elem.author.avatar;
    element.style.top = elem.location.x + 'px';
    element.style.left = elem.location.y + 'px';
    fragment.appendChild(element);
  }
  pins.appendChild(fragment);
}

document.querySelector('.map').classList.remove('map--faded');
drowPins();

// function enableInputs() {
//   var form = document.querySelector('.ad-form');
//   var fieldset = form.querySelectorAll('fieldset');
//   for (var i = 0; i < fieldset.length; i++) {
//     fieldset[i].disabled = false;
//   }
// }

// function disableInputs() {
//   var form = document.querySelector('.ad-form');
//   var fieldset = form.querySelectorAll('fieldset');
//   for (var i = 0; i < fieldset.length; i++) {
//     fieldset[i].disabled = true;
//   }
// }
// disableInputs();

// var mainPin = document.querySelector('.map__pin--main');
// function makeActiv(evt) {
//   if (evt.button === 0) {
//     document.querySelector('.map').classList.remove('map--faded');
//     document.querySelector('.ad-form').classList.remove('ad-form--disabled');
//     enableInputs();
//     drowPins();
//   }
//   mainPin.removeEventListener('mousedown', makeActiv);
// }
// mainPin.addEventListener('mousedown', makeActiv);
