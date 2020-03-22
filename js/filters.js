'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var housingType = filtersForm.querySelector('#housing-type');
  var housingPrice = filtersForm.querySelector('#housing-price');
  var housingRooms = filtersForm.querySelector('#housing-rooms');
  var housingGuests = filtersForm.querySelector('#housing-guests');
  var filterWifi = filtersForm.querySelector('#filter-wifi');
  var filterDishwasher = filtersForm.querySelector('#filter-dishwasher');
  var filterParking = filtersForm.querySelector('#filter-parking');
  var filterWasher = filtersForm.querySelector('#filter-washer');
  var filterElevator = filtersForm.querySelector('#filter-elevator');
  var filterConditioner = filtersForm.querySelector('#filter-conditioner');
  var lastTomeOut;

  function checkFeatures(filter, i) {
    return window.dataBase[i].offer.features.indexOf(filter.value) > -1;
  }

  function checkForm() {
    window.map.hidePins();
    window.card.removeFromMap();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.dataBase.length; i++) {
      if (fragment.children.length === 5) {
        break;
      }
      var result = true;
      if (window.dataBase[i].offer.type !== housingType.value && housingType.value !== 'any') {
        result = false;
      }
      switch (housingPrice.value) {
        case 'middle':
          result = window.data.prices.low < window.dataBase[i].offer.price && window.dataBase[i].offer.price < window.data.prices.high ? result : false;
          break;
        case 'low':
          result = window.data.prices.low < window.dataBase[i].offer.price ? false : result;
          break;
        case 'high':
          result = window.dataBase[i].offer.price < window.data.prices.high ? false : result;
          break;
        default:
          break;
      }
      if (window.dataBase[i].offer.rooms !== parseInt(housingRooms.value, 10) && housingRooms.value !== 'any') {
        result = false;
      }
      if (window.dataBase[i].offer.guests !== parseInt(housingGuests.value, 10) && housingGuests.value !== 'any') {
        result = false;
      }
      if (filterWifi.checked) {
        result = checkFeatures(filterWifi, i) ? result : false;
      }
      if (filterDishwasher.checked) {
        result = checkFeatures(filterDishwasher, i) ? result : false;
      }
      if (filterParking.checked) {
        result = checkFeatures(filterParking, i) ? result : false;
      }
      if (filterWasher.checked) {
        result = checkFeatures(filterWasher, i) ? result : false;
      }
      if (filterElevator.checked) {
        result = checkFeatures(filterElevator, i) ? result : false;
      }
      if (filterConditioner.checked) {
        result = checkFeatures(filterConditioner, i) ? result : false;
      }

      if (result) {
        fragment.appendChild(window.pins.draw(window.dataBase[i], i));
      }
    }
    window.pins.appendToMapPins(fragment);
  }

  filtersForm.addEventListener('change', function () {
    if (lastTomeOut) {
      window.clearTimeout(lastTomeOut);
    }
    lastTomeOut = window.setTimeout(function () {
      checkForm();
    }, 500);
  });
})();
