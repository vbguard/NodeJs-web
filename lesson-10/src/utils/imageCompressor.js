const imagemin = require('imagemin');
// const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');
const imageminSvgo = require('imagemin-svgo');
const fs = require('fs');
const path = require('path');

const imageCopmressor = () =>
  imagemin(['tmp/*'], {
    destination: 'upload/images',
    plugins: [
      // imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
      imageminSvgo(),
      imageminWebp(),
    ],
  })
    .then(data => {
      const tmpDir = path.resolve(__dirname, '../../tmp');

      fs.readdir(tmpDir, (err, files) => {
        if (err) throw new Error(err);

        for (const file of files) {
          fs.unlink(path.join(tmpDir, file), err => {
            if (err) throw new Error(err);
          });
        }
      });

      return data;
    })
    .catch(err => {
      throw new Error(err);
    });

module.exports = imageCopmressor;
