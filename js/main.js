'use strict';

var createOffer = (function () {
  var arr = [
    {
      'author': {
        'avatar': 'img/avatars/user01.png'
      },
      'offer': {
        'title': 'Title 1',
        'address': '100, 350',
        'price': 100,
        'type': 'palace',
        'rooms': 2,
        'guests': 2,
        'checkin': '12:00',
        'checkout': '12:00',
        'features': ['wifi', 'dishwasher'],
        'description': 'description 1',
        'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg'],
      },
      'location': {
        'x': 72,
        'y': 140
      }
    },
    {
      'author': {
        'avatar': 'img/avatars/user02.png'
      },
      'offer': {
        'title': 'Title 2',
        'address': '150, 350',
        'price': 120,
        'type': 'flat',
        'rooms': 2,
        'guests': 2,
        'checkin': '12:00',
        'checkout': '13:00',
        'features': ['wifi', 'dishwasher', 'parking'],
        'description': 'description 2',
        'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
      },
      'location': {
        'x': 87,
        'y': 140
      }
    },
    {
      'author': {
        'avatar': 'img/avatars/user03.png'
      },
      'offer': {
        'title': 'Title 3',
        'address': '100, 300',
        'price': 130,
        'type': 'house',
        'rooms': 3,
        'guests': 2,
        'checkin': '12:00',
        'checkout': '14:00',
        'features': ['wifi', 'dishwasher', 'parking'],
        'description': 'description 3',
        'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
      },
      'location': {
        'x': 65,
        'y': 140
      }
    },
    {
      'author': {
        'avatar': 'img/avatars/user04.png'
      },
      'offer': {
        'title': 'Title 4',
        'address': '500, 310',
        'price': 130,
        'type': 'bungalo',
        'rooms': 3,
        'guests': 3,
        'checkin': '13:00',
        'checkout': '14:00',
        'features': ['wifi', 'dishwasher', 'parking', 'elevator'],
        'description': 'description 4',
        'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
      },
      'location': {
        'x': 63,
        'y': 180
      }
    },
    {
      'author': {
        'avatar': 'img/avatars/user05.png'
      },
      'offer': {
        'title': 'Title 5',
        'address': '400, 310',
        'price': 130,
        'type': 'bungalo',
        'rooms': 5,
        'guests': 5,
        'checkin': '14:00',
        'checkout': '14:00',
        'features': ['wifi', 'dishwasher', 'elevator'],
        'description': 'description 5',
        'photos': ['http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
      },
      'location': {
        'x': 50,
        'y': 180
      }
    },
    {
      'author': {
        'avatar': 'img/avatars/user06.png'
      },
      'offer': {
        'title': 'Title 6',
        'address': '360, 300',
        'price': 180,
        'type': 'flat',
        'rooms': 2,
        'guests': 5,
        'checkin': '12:00',
        'checkout': '14:00',
        'features': ['wifi'],
        'description': 'description 6',
        'photos': ['http://o0.github.io/assets/images/tokyo/hotel2.jpg'],
      },
      'location': {
        'x': 26,
        'y': 630
      }
    },
    {
      'author': {
        'avatar': 'img/avatars/user07.png'
      },
      'offer': {
        'title': 'Title 7',
        'address': '90, 350',
        'price': 1800,
        'type': 'flat',
        'rooms': 3,
        'guests': 5,
        'checkin': '12:00',
        'checkout': '12:00',
        'features': ['wifi'],
        'description': 'description 7',
        'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg'],
      },
      'location': {
        'x': 20,
        'y': 600
      }
    },
    {
      'author': {
        'avatar': 'img/avatars/user08.png'
      },
      'offer': {
        'title': 'Title 8',
        'address': '260, 350',
        'price': 18000,
        'type': 'flat',
        'rooms': 6,
        'guests': 5,
        'checkin': '12:00',
        'checkout': '14:00',
        'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
        'description': 'description 8',
        'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg'],
      },
      'location': {
        'x': 10,
        'y': 550
      }
    },
  ];

  return arr;
})();

document.querySelector('.map').classList.remove('map--faded');
var pins = document.querySelector('.map__pins');
var elements = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();

function renderPin(elem) {
  var element = elements.cloneNode(true);
  element.querySelector('img').alt = elem.offer.title;
  element.querySelector('img').src = elem.author.avatar;
  element.style.top = +elem.offer.address.split(',')[0] + elem.location.x + 'px';
  element.style.left = +elem.offer.address.split(',')[1] + elem.location.y + 'px';
  return element;
}

for (var i = 0; i < 8; i++) {
  fragment.appendChild(renderPin(createOffer[i]));
}

pins.appendChild(fragment);
