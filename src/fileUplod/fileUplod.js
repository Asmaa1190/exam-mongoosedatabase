import { appError } from '../utils/appError.js';
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';


export const fileUpload = (fieldName) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, uuidv4() + "-" + file.originalname)
        }
    })

    function fileFilter(req, file, cb) {
       
        if (file.mimetype.startsWith('application')) {
             cb(null, true) 
        } else {
            cb(new appError('pdf only', 401), false)
        }

    }

    const upload = multer({ storage, fileFilter,limits:{
        
        fileSize:1*1024*1024
    } })
    return upload.single(fieldName)
}
