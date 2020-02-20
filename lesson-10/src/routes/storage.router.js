const router = require('express').Router();
const multer = require('multer');
const upload = multer();
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: 'AKIAXXNYEGXHIYTRZ7UW',
  secretAccessKey: '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',
});

router
  .post('/', upload.single('file'), (req, res) => {
    const file = req.file;

    const params = {
      Body: file.buffer,
      Bucket: 'rn8',
      Key: file.originalname,
      ACL: 'public-read',
    };

    s3.upload(params, {}, (err, data) => {
      // data вертає тільки результат збереження і URL до файлу + інще
      res.json({
        file: data.Location,
      });
    });

    // s3.putObject(params, (err, data) => {
    //   res.json({
    //     s3: data, // вертає тільки ETag - тобто результат
    //   });
    // });
  })
  .get('/:file', (req, res) => {
    const file = req.params.file;

    var params = {
      Bucket: 'rn8',
      Key: file,
    };

    s3.getObject(params, function(err, data) {
      if (err) res.json({ err });

      res.send(data.Body);
    });
  });

module.exports = router;
