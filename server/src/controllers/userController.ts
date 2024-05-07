import { Request, Response, response } from "express"
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

const getAll = async (req: Request, res: Response) => {
    if (res.locals.role === '_admin') {
        try {
            const users = await User.find({_id: {$ne: process.env.ADMIN_OBJECT_ID}}, '-password').exec();
            res.status(200).json({
                sucess: true,
                users
            })
        } catch (error) {
            res.status(400).json({
                sucess: false,
                message: "Couldn't load users"
            })
        }
    }
}

const getRole = async (req: any, res: Response) => {
    try {
        const id: string = res.locals._id;
        const role: string = res.locals.role;
        res.status(200).json({
            "role": role,
        })

    } catch (error) {
        console.error(error)
        res.status(404).json({
            message: "Login Expired"
        })
    }
}


module.exports = {
    createUser,
    loginUser,
    getRole,
    getAll
}