const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "backend/upload/images");
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname
        .toLocaleLowerCase()
        .split(" ")
        .join("-");
      cb(null, Date.now() + fileName);
    },
  }),

  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid MIME Type");
    cb(error, isValid);
  },
});

module.exports = fileUpload;
