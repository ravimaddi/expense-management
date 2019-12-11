const multer = require('multer');
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config()

AWS.config.update({
  accessKeyId:process.env.ACCESS_KEY_ID,
  secretAccessKey:process.env.SECRET_ACCESS_KEY,
  region:process.env.REGION
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
      s3: s3,
      bucket: 'ravikeepimage',
      metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
          cb(null,new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
      }
  })

})

// const multer =require('multer')
// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, '\Images');
//     },
//     filename: (req, file, cb) => {
//       cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
//     }
//   });
//   const upload= multer({ storage: fileStorage }).single('file')
  module.exports = upload