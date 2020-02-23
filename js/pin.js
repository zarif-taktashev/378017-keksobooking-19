'use strict';

(function () {
  function createPins(i) {
    var offer =
    {
      author: {
        avatar: 'img/avatars/user' + window.data.createAvatarNumber(i) + '.png'
      },
      offer: {
        title: 'Title ' + i,
        address: function () {
          return this.location.x.toString() + this.location.y.toString();
        },
        price: window.data.getRandomInteger(100, 1000),
        type: window.data.TYPE[window.data.getRandomInteger(0, 3)],
        rooms: window.data.getRandomInteger(1, 4),
        guests: window.data.getRandomInteger(1, 4),
        checkin: window.data.TIMES[window.data.getRandomInteger(0, 2)],
        checkout: window.data.TIMES[window.data.getRandomInteger(0, 2)],
        features: window.data.getRandomArray(window.data.FEATURES),
        description: 'description' + i,
        photos: window.data.getRandomArray(window.data.PHOTOS),
      },
      location: {
        x: window.data.getRandomInteger(100, 1100),
        y: window.data.getRandomInteger(130, 630)
      }
    };

    return offer;
  }

  window.createPins = createPins;
})();
