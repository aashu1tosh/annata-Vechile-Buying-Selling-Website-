import { ObjectId } from "mongoose";

interface Image {
    data: Buffer;
    contentType: string;
}

export interface ICar {
    dealerId: ObjectId,
    year: number,
    manufacturer: string,
    model: string,
    mileage: number,
    engine: string,
    description: string,
    image: Image
}
