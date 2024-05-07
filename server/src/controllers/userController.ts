import { Request, Response } from "express"
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


interface UserCredentials {
    email: string,
    password: string,
}

interface IUser {
    name: string;
    email: string;
    password: string;
    role: string
}

interface BasicInfo {
    id: string,
    name: string,
    role: string
}

const createUser = async (req: Request, res: Response) => {
    try {
        let user: IUser = req.body
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash
        user = await User.create(user);
        res.status(200).json({
            message: "User created Successfully",
            "user": user
        })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password }: UserCredentials = req.body;
        const user = await User.findOne({ email });

        // Working code till
        // if(user) {
        //     const isValid:boolean = await bcrypt.compare(password, user.password);
        //     console.log(isValid)
        //     if(isValid){
        //         res.status(200).json({
        //             message: "Login Successful"
        //         })
        //     } else {
        //         res.status(400).json({
        //             message: "something went wrong"
        //         })
        //     }
        // }

        //works till here

        if (!user) {
            return res.status(400).json({
                error: "user not found",
            })
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                error: "Incorrect password"
            })
        }
        console.log(process.env.JSON_SECRET_KEY)
        const token = jwt.sign({ userId: user._id }, process.env.JSON_SECRET_KEY, {
            expiresIn: '1h',
        });

        res.status(200).json({
            message: "Success",
            user,
            token
        })

    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

const auth = async (req:Request, res:Response) => {
        // const token = req.body.token;
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];
        if (token) {
            const decoded = jwt.verify(token, process.env.JSON_SECRET_KEY);
            console.log(decoded, 'decoded');
            const user: BasicInfo = await User.findById({ _id: decoded.userId });
            res.status(200).json({
                user
            })
        }
        else {
            res.status(400).json({
                login: false,
            })
        }
    }


module.exports = {
    createUser,
    loginUser,
    auth
}