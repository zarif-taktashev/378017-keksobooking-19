'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'lpeg', 'png'];
  var avatar = document.querySelector('#avatar');
  var photos = document.querySelector('#images');
  var avatarImg = document.querySelector('.ad-form-header__preview img');
  var formPhoto = document.querySelector('.ad-form__photo');

  avatar.addEventListener('change', function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    })

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarImg.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photos.addEventListener('change', function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    })

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var photo = avatarImg.cloneNode(true);
        photo.alt = 'Фотография жилья';
        photo.src = reader.result;
        formPhoto.appendChild(photo);
        formPhoto.style.padding = '10px 15px 0';
      });

      reader.readAsDataURL(file);
    }
  });
})();
