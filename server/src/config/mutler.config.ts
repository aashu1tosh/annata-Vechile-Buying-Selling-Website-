import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

// Define storage
const storage = multer.memoryStorage();

// Define file filter
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Only .jpeg and .png files are allowed!') as unknown as null, false);
    }
};

// Define upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // limit file size to 5MB
    },
    fileFilter: fileFilter
});

export default upload;
