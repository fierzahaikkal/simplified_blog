import path from "path";
import multer from "multer";

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/images");
  },
  filename: function (req, file, callback) {
    let ext = path.extname(file.originalname);
    callback(null, Date.now() + ext);
  },
});

let upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      callback(null, true);
    } else {
      console.log("input type file png/jpg/jpeg");
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

export default upload;
