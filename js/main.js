'use strict';

function createOffer (index) {
  var address = ['100, 350', '150, 350', '100, 300', '500, 310', '400, 310', '360, 300', '90, 350', '260, 350'];
  var locations = [{x: 72, y: 140}, {x: 87, y: 140}, {x: 65, y: 140}, {x: 63, y: 180}, {x: 50, y: 180}, {x: 26, y: 630}, {x: 20, y: 600}, {x: 10, y: 550}];
  var Offer =
  {
    'author': {
      'avatar': 'img/avatars/user0' + index + '.png'
    },
    'offer': {
      'title': 'Title ' + index,
      'address': address[i - 1],
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
      'x': locations[i - 1].x,
      'y': locations[i - 1].y
    }
  };

  return Offer;
}

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

for (var i = 1; i < 8; i++) {
  var elem = createOffer(i);
  fragment.appendChild(renderPin(elem));
}

pins.appendChild(fragment);
