import { Request, Response } from "express"
import { ICar } from "../interface/car.interface";
import { ObjectId } from "mongoose";


const Car = require('../models/carModel')
const createCar = async (req: Request, res: Response) => {
    try {
        const id: ObjectId = res.locals._id;
        const role: string = res.locals.role;
        req.body.dealerId = id;
        if (id && role === 'dealer') {
            let car: ICar = req.body;
            car = await Car.create(car);
            res.status(200).json({
                success: true,
                message: "sucess",
                car
            })
        } else {
            res.status(403).json({
                success: false,
                message: "Authorization Failed",
            })
        }
    } catch (error) {
        res.status(200).json({
            success: false,
            message: "failed",
            error
        })
    }
}

const getAddedCars = async (req: Request, res: Response) => {
    try {
        const id: ObjectId = res.locals._id;
        const role: string = res.locals.role;
        console.log(id, typeof (id))
        if (role === 'dealer') {
            const cars = await Car.find({ dealerId: id }, '-updatedAt -__v -dealerId').sort({ createdAt: -1 });
            res.status(200).json({
                success: true,
                message: "All your posted cars",
                cars
            })
        } else {
            res.status(403).json({
                success: false,
                message: "Authorization Failed",
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        })
    }
}

const getAllCars = async (req: Request, res: Response) => {
    try {
        const role: string = res.locals.role;
        if (role === 'customer') {
            const cars = await Car.find({}, '-updatedAt -__v')
            res.status(200).json({
                success: true,
                message: "All cars",
                cars
            })
        } else {
            res.status(403).json({
                success: false,
                message: "Authorization Failed",
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        })
    }
}

const getParticularCar = async (req: Request, res: Response) => {
    try {
        const role: string = res.locals.role;
        const { id } = req.params;

        if (role === 'customer') {
            const car = await Car.findOne({ _id: id }).populate({
                path: 'dealerId',
                match: { role: 'dealer' },
                select: 'name email'
            })

            if (car) {
                res.status(200).json({
                    success: true,
                    message: "Car and Dealers Detail",
                    car,
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: "Car not found"
                })
            }

        } else {
            res.status(403).json({
                success: false,
                message: "Authorization Failed",
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something went wrong",

        })
    }
}

const deletecar = async (req: Request, res: Response) => {
    try {
        const uId: ObjectId = res.locals._id;
        const role: string = res.locals.role;
        const { id } = req.params;

        if (role == 'dealer') {
            const car = await Car.findById({ _id: id })

            if (uId == car.dealerId) {
                console.log("THis statement is true");
                await Car.findByIdAndDelete({ _id: id })
                res.status(200).json({
                    success: true,
                    message: "Card Deleted successfully",
                })
            }
        } else {
            res.status(403).json({
                success: false,
                message: "Authorization Failed",
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",

        })
    }
}


module.exports = {
    createCar,
    getAddedCars,
    getAllCars,
    getParticularCar,
    deletecar
}