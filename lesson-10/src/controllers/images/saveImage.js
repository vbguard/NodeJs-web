const imageCompressor = require('../../utils/imageCompressor');
const path = require('path');
const { SERVER_URL_LOCAL } = require('../../config/config');

const saveImage = async (req, res) => {
  // if (req.files.length > 0) {
  //   const images = req.files.map(img => {
  //     return img.filename;
  //   });
  //   // newProduct.photos = images;
  // }

  const result = await imageCompressor();

  const filePath = path.resolve(
    __dirname,
    '../../../' + result[0].destinationPath,
  );

  if (result.length !== 1) {
    const normalized = result.map(el => {
      return { imageUrl: SERVER_URL_LOCAL + '/' + el.destinationPath };
    });

    res.json({
      images: normalized,
    });
  } else {
    res.download(filePath);
    // res.json({
    //   image: SERVER_URL_LOCAL + '/' + result[0].destinationPath,
    // });
  }
};

module.exports = saveImage;
