import mongoose from "mongoose";
import { IUser } from "../interface/user.interface";


const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    role: {type: String, required: true}
}, {
    timestamps: true
});

const User = mongoose.model<IUser>('user', userSchema);

module.exports = User