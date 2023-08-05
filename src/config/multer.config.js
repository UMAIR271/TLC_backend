import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Upload destination folder
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Keep the original file name
    },
  });

  const upload = multer({ storage: storage });

  export default upload;