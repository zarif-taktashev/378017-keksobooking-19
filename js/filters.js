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

  function checkForm() {
    window.map.hidePins();
    window.card.removeCardFromMap();
    var fragment = document.createDocumentFragment();
    window.dataBase.filter(function (item, index) {
      var result = true;
      if (index >= window.data.pins.LIMITS) {
        result = false;
      }
      if (item.offer.type !== housingType.value && housingType.value !== 'any') {
        result = false;
      }
      switch (housingPrice.value) {
        case 'middle':
          result = window.data.prices.low < item.offer.price && item.offer.price < window.data.prices.high ? result : false;
          break;
        case 'low':
          result = window.data.prices.low < item.offer.price ? false : result;
          break;
        case 'high':
          result = item.offer.price < window.data.prices.high ? false : result;
          break;
        default:
          break;
      }
      if (item.offer.rooms !== parseInt(housingRooms.value, 10) && housingRooms.value !== 'any') {
        result = false;
      }
      if (item.offer.guests !== parseInt(housingGuests.value, 10) && housingGuests.value !== 'any') {
        result = false;
      }
      if (filterWifi.checked) {
        result = item.offer.features.indexOf(filterWifi.value) > -1 ? result : false;
      }
      if (filterDishwasher.checked) {
        result = item.offer.features.indexOf(filterDishwasher.value) > -1 ? result : false;
      }
      if (filterParking.checked) {
        result = item.offer.features.indexOf(filterParking.value) > -1 ? result : false;
      }
      if (filterWasher.checked) {
        result = item.offer.features.indexOf(filterWasher.value) > -1 ? result : false;
      }
      if (filterElevator.checked) {
        result = item.offer.features.indexOf(filterElevator.value) > -1 ? result : false;
      }
      if (filterConditioner.checked) {
        result = item.offer.features.indexOf(filterConditioner.value) > -1 ? result : false;
      }

      if (result) {
        fragment.appendChild(window.pins.draw(item, index));
      }

      return result;
    });
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
