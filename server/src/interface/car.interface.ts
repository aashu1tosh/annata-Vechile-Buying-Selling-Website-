import { ObjectId } from "mongoose";

export interface ICar {
    dealerId: ObjectId,
    year: number,
    manufacturer: string,
    model: string,
    mileage: number,
    engine: string,
    description: string,
}
