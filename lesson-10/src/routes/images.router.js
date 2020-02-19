const router = require('express').Router();
const uuid = require('short-uuid');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // тут вказуємо тимчасову дерикторію зберігання файлів, які нам відправлють
    cb(null, path.resolve(__dirname, '../../tmp'));
  },
  filename: function(req, file, cb) {
    // тут ми можемо змінюватись назву файлів які нам передають
    const fileExt = file.originalname.split('.')[1];

    cb(null, uuid().new() + '.' + fileExt);
  },
});

const { getImages, saveImage } = require('../controllers/images');

const upload = multer({ storage: storage });

router
  .post(
    '/save',
    upload.fields([{ name: 'photo' }, { name: 'image' }]),
    saveImage,
  )
  .get('/:width/:images', getImages)
  .get('/:images', getImages);

module.exports = router;
