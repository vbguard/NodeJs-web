const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

const getImages = (req, res) => {
  const { width, images } = req.params;

  const format = images.split('.').pop();

  const sendError = (err, code) => {
    const errMessage = err.message || 'must handle this error';

    res.status(code || 400).json({
      status: 'error',
      message: errMessage,
    });
  };

  const extentions = [
    'heic',
    'heif',
    'jpeg',
    'jpg',
    'png',
    'raw',
    'tiff',
    'webp',
  ];

  if (!extentions.includes(format)) {
    return sendError({
      message: 'Allowed extentions: ' + extentions.join(', '),
    });
  }

  const imgPath = path.join(
    __dirname,
    '../../../upload/images',
    images.split('.')[0] + '.webp',
  );

  if (!fs.existsSync(imgPath)) {
    return sendError({ message: 'No found' }, 404);
  }

  if (!width) {
    res.type(`image/${format || 'webp'}`);
    return res.sendFile(imgPath);
  }

  const readStream = fs.createReadStream(imgPath);
  let transform = sharp();

  if (width) {
    const isNum = Number(width);
    if (isNum) {
      if (50 > isNum || isNum > 5000) {
        return sendError({
          message: 'min width is 50 and max width is 5000',
        });
      }

      transform = transform.resize(Number(width));
    } else {
      return sendError({
        message: 'its not a number',
      });
    }
  }

  if (format) {
    transform = transform.toFormat(format);
  }
  res.type(`image/${format || 'webp'}`);

  return readStream.pipe(transform).pipe(res);
};

module.exports = getImages;
