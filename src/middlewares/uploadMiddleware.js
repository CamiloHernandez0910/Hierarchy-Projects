import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".zip") {
        return cb(new Error("Solo se permiten archivos ZIP"), false);
    }
    cb(null, true);
};

const upload = multer({ storage, fileFilter });

export default upload;
