const fs = require('fs');
const path = require('path');

const deleteProductPhoto = filesName => {
  for (let i = 0; i < filesName.length; i++) {
    const photoPath = path.join(
      __dirname,
      '../../upload/images/products',
      filesName[i],
    );
    fs.unlink(photoPath, err => {
      if (err) console.error(err);
    });
  }
};

module.exports = deleteProductPhoto;
