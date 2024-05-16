import { Request, Response } from "express"
import { ICar } from "../interface/car.interface";


const Car = require('../models/carModel')

const createCar = async (req: Request, res: Response) => {
    try {
        const id: string = res.locals._id;
        const role: string = res.locals.role;
        req.body.dealerId = id;
        if(id && role === 'dealer') {
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

module.exports = {
    createCar
}