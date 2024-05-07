// const jwt = require('jsonwebtoken');
// import { Request as ExpressRequest, Response, NextFunction } from "express";


// interface RequestWithUserId extends ExpressRequest {
//     userId?: string; // Define userId property
// }

// function verifyToken(req: ExpressRequest, res: Response, next: NextFunction) {
//     const token = req.header('Authorization');
//     if (!token) 
//         return res.status(401).json({ message: 'Access Denied' });
//     try {
//         const decoded = jwt.verify(token, process.env.JSON_SECRET_KEY);
//         console.log(decoded, 'decoded');
//         req.userId = decoded.userId;
//         next(); // Pass control to the next middleware or route handler
//     } catch {
//         return res.status(401).json({ message: 'Invalid Token' });
//     }
// }

// module.exports = verifyToken;


import { Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken')



function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Access Denied' });

    jwt.verify(token, process.env.JSON_SECRET_KEY, (err: any, decoded: any) => {

        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        (res as any).locals._id = decoded.userId;
        next();
    });
}

module.exports = {
    verifyToken
}
