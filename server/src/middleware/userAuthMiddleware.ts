import { NextFunction, Request, Response } from "express";
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')



function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Access Denied' });

    jwt.verify(token, process.env.JSON_SECRET_KEY, async (err: any, decoded: any) => {

        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        (res as any).locals._id = decoded.userId;
        const roleAndId = await User.findOne({ _id: decoded.userId }, 'role');
        (res as any).locals.role = roleAndId.role;
        next();
    });
}

module.exports = {
    verifyToken
}
