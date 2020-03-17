'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var filters = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');

  function removeCardFromMap() {
    if (map.querySelector('.map__card')) {
      map.removeChild(map.querySelector('.map__card'));
    }
  }


  function hideCard(evt) {
    if (evt.button === window.data.buttons.LEFT_MOUSE_BUTTON || evt.key === window.data.buttons.ESC_BUTTON) {
      removeCardFromMap();
    }
  }

  function drawCards(response) {
    if (map.querySelector('.map__card')) {
      map.removeChild(map.querySelector('.map__card'));
    }
    var fragment = document.createDocumentFragment();
    var elem = response;
    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__title').innerText = elem.offer.title;
    card.querySelector('.popup__text--address').innerText = elem.offer.address;
    card.querySelector('.popup__text--price').innerText = elem.offer.price + '₽/ночь';
    switch (elem.offer.type) {
      case 'flat':
        card.querySelector('.popup__type').innerText = 'Квартира';
        break;
      case 'bungalo':
        card.querySelector('.popup__type').innerText = 'Бунгало';
        break;
      case 'house':
        card.querySelector('.popup__type').innerText = 'Дом';
        break;
      case 'palace':
        card.querySelector('.popup__type').innerText = 'Дворец';
        break;
      default:
        throw new Error(window.data.errors.BUILD_TYPE);
    }
    card.querySelector('.popup__text--capacity').innerText = elem.offer.rooms + ' комнаты для ' + elem.offer.guests;
    card.querySelector('.popup__text--time').innerText = 'Заезд после ' + elem.offer.checkin + ' выезд до ' + elem.offer.checkout;
    var featuresFragment = document.createDocumentFragment();
    elem.offer.features.forEach(function (item) {
      card.querySelector('.popup__feature--' + item).innerText = item;
      featuresFragment.appendChild(card.querySelector('.popup__feature--' + item));
    });
    card.querySelector('.popup__features').innerHTML = '';
    card.querySelector('.popup__features').appendChild(featuresFragment);
    card.querySelector('.popup__description').innerText = elem.offer.description;
    var photosFragment = document.createDocumentFragment();
    elem.offer.photos.forEach(function (item) {
      var img = card.querySelector('.popup__photo').cloneNode(true);
      img.src = item;
      photosFragment.appendChild(img);
    });
    card.querySelector('.popup__photos').innerHTML = '';
    card.querySelector('.popup__photos').appendChild(photosFragment);
    card.querySelector('.popup__avatar').src = elem.author.avatar;
    card.querySelector('.popup__close').addEventListener('mousedown', hideCard);
    card.querySelector('.popup__close').addEventListener('keydown', hideCard);
    fragment.appendChild(card);
    map.insertBefore(fragment, filters);
  }
  window.card = {
    hideCard: hideCard,
    drawCards: drawCards,
    removeCardFromMap: removeCardFromMap
  };
})();
