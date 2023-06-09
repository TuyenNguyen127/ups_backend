const multer = require("multer");

const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only excel file.", false);
  }
};

const imgFilter = (req, file, cb) => {
  if (!/\S+\.(jpg|bmp|gif|png)/gi.test(file.originalname)) {
    return cb(Error('Invalid image file name'), false)
  } else {
    cb(null, true);
  }
}

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

var storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: excelFilter }).single('file');
var uploadImg = multer({storage: storage2, fileFilter: imgFilter}).single('data');

module.exports = {uploadFile, uploadImg};
