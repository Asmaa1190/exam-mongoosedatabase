import { appError } from "../utils/appError.js";

 export const authorize = (roles) => {
    return (req, res, next) => {
        let{role}=req.headers
        if (!role) {
            // return res.status(403).json({ message: 'Forbidden' });
            next(new appError('forbidden',403))
        }
        next();
    };
};