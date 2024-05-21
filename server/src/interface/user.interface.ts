import mongoose from "mongoose";

export interface UserCredentials {
    email: string,
    password: string,
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: string
    car: mongoose.Schema.Types.ObjectId
}