import { Request, Response } from "express"
import { ICar } from "../interface/car.interface";


const Car = require('../models/carModel')

const createCar = async (req: Request, res: Response) => {
    try {
        const id: string = res.locals._id;
        const role: string = res.locals.role;
        req.body.dealerId = id;
        if (id && role === 'dealer') {
            let car: ICar = req.body;
            car = await Car.create(car);
            res.status(200).json({
                message: "sucess",
                car
            })
        }

    } catch (error) {
        res.status(200).json({
            message: "failed",
            error
        })
    }
}

const getAddedCars = async (req: Request, res: Response) => {
    try {
        const id: string = res.locals._id;
        const role: string = res.locals.role;
        if (role === 'dealer') {
            const cars = await Car.find({ dealerId: id }, '-updatedAt -__v -dealerId').sort({ createdAt: -1 });
            res.status(200).json({
                success: true,
                message: "All your posted cars",
                cars
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
    getAllCars
}