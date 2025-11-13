//use this config page for manage the profile picture of user
//multer is a middle ware for nodejs , express because express only can known json and text for get file like ".jpg" should use multer
import multer from "multer";
import path from "path";

// route to save files
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

// make filter on files type
function fileFilter(req, file, cb) {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);
  /* for security we should check file type but just checking "extName" not safe becuase maybe hacker change it (virus.png) for example
  so we should check mime type , mime type.test checking type of header of file
  */
  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (JPG, PNG, WEBP) are allowed!"));
  }
}

// limit file size and filter type of it for uploading
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // ۲ مگابایت
});

export default upload;
