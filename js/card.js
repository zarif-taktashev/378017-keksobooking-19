'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var filters = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');

  function removeFromMap() {
    var mapCard = map.querySelector('.map__card');
    if (mapCard) {
      map.removeChild(mapCard);
    }
  }


  function onHideCard(evt) {
    if (evt.button === window.data.buttons.LEFT_MOUSE_BUTTON || evt.key === window.data.buttons.ESC_BUTTON) {
      document.querySelector('.map__pin.map__pin--active').classList.remove('map__pin--active');
      removeFromMap();
    }
    if (evt.currentTarget.tagName === 'BODY' && evt.key === window.data.buttons.ESC_BUTTON) {
      document.body.removeEventListener('keydown', onHideCard);
    }
  }

  function drawCards(response) {
    if (map.querySelector('.map__card')) {
      map.removeChild(map.querySelector('.map__card'));
    }
    var fragment = document.createDocumentFragment();
    var data = response;
    var card = cardTemplate.cloneNode(true);
    if (data.offer.title) {
      card.querySelector('.popup__title').innerText = data.offer.title;
    } else {
      card.querySelector('.popup__title').style.display = 'none';
    }
    if (data.offer.address) {
      card.querySelector('.popup__text--address').innerText = data.offer.address;
    } else {
      card.querySelector('.popup__text--address').style.display = 'none';
    }
    if (data.offer.price) {
      card.querySelector('.popup__text--price').innerText = data.offer.price + '₽/ночь';
    } else {
      card.querySelector('.popup__text--price').style.display = 'none';
    }
    switch (data.offer.type) {
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
        card.querySelector('.popup__type').style.display = 'none';
        throw new Error(window.data.errors.BUILD_TYPE);
    }
    if (data.offer.rooms && data.offer.guests) {
      card.querySelector('.popup__text--capacity').innerText = data.offer.rooms + ' комнаты для ' + data.offer.guests;
    } else {
      card.querySelector('.popup__text--capacity').style.display = 'none';
    }
    if (data.offer.checkin && data.offer.checkout) {
      card.querySelector('.popup__text--time').innerText = 'Заезд после ' + data.offer.checkin + ' выезд до ' + data.offer.checkout;
    } else {
      card.querySelector('.popup__text--time').style.display = 'none';
    }
    if (data.offer.features.toString()) {
      var featuresFragment = document.createDocumentFragment();
      data.offer.features.forEach(function (item) {
        card.querySelector('.popup__feature--' + item).innerText = item;
        featuresFragment.appendChild(card.querySelector('.popup__feature--' + item));
      });
      card.querySelector('.popup__features').innerHTML = '';
      card.querySelector('.popup__features').appendChild(featuresFragment);
    } else {
      card.querySelector('.popup__features').style.display = 'none';
    }
    if (data.offer.description) {
      card.querySelector('.popup__description').innerText = data.offer.description;
    } else {
      card.querySelector('.popup__description').style.display = 'none';
    }

    if (data.offer.photos.toString()) {
      var photosFragment = document.createDocumentFragment();
      data.offer.photos.forEach(function (item) {
        var img = card.querySelector('.popup__photo').cloneNode(true);
        img.src = item;
        photosFragment.appendChild(img);
      });
      card.querySelector('.popup__photos').innerHTML = '';
      card.querySelector('.popup__photos').appendChild(photosFragment);
    } else {
      card.querySelector('.popup__photos').style.display = 'none';
    }

    if (data.author.avatar) {
      card.querySelector('.popup__avatar').src = data.author.avatar;
    } else {
      card.querySelector('.popup__avatar').style.display = 'none';
    }
    card.querySelector('.popup__close').addEventListener('mousedown', onHideCard);
    document.body.addEventListener('keydown', onHideCard);
    fragment.appendChild(card);
    map.insertBefore(fragment, filters);
  }
  window.card = {
    drawCards: drawCards,
    removeFromMap: removeFromMap
  };
})();
