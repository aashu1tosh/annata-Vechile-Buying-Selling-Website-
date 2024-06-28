import { Request, Response } from "express"
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

import { IUser, UserCredentials } from "../interface/user.interface"

const createUser = async (req: Request, res: Response) => {
    try {
        let user: IUser = req.body
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash

        const userResponse = await User.create(user);
        console.log(userResponse, "userResponse");
        const { password, ...reset } = user;
        res.status(200).json({
            message: "User created Successfully",
            user: reset
        })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password }: UserCredentials = req.body;
        const user = await User.findOne({ email });
        //works till
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
        const token = jwt.sign({ userId: user._id }, process.env.JSON_SECRET_KEY, {
            expiresIn: '30d',
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
            const users = await User.find({ _id: { $ne: process.env.ADMIN_OBJECT_ID } }, '-password -updatedAt -createdAt -__v').exec();
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

const deleteUser = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        if (res.locals.role === '_admin') {
            await User.findByIdAndDelete(id).then(() => {
                res.status(200).json({
                    success: true,
                    message: "User Delete Successfully"
                })
            }).catch(() => {
                res.status(400).json({
                    sucess: false,
                    message: "Somethings Went Wrong"
                })
            })
        }
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: "Server Error"
        })
    }
}

const changePassword = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const password = req.body.password;
    try {
        if (res.locals.role == '_admin') {
            await User.findByIdAndUpdate(id, { password: await bcrypt.hash(password, 10) }).then(() => {
                res.status(200).json({
                    success: true,
                    message: "Password Change Successfully"
                })
            }).catch(() => {
                res.status(400).json({
                    success: false,
                    message: 'Password Change Unsuccessful!'
                })
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    getRole,
    getAll,
    deleteUser,
    changePassword
}