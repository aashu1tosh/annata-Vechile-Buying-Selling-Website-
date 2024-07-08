import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

// import morgan from 'morgan';


const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const userRoute = require('./routes/userRoutes')
const carRoute = require('./routes/carRoutes')


dotenv.config();
const app = express();

const port = process.env.BACKEND_PORT
app.use(express.json());
app.use(cors());
app.use(morgan('common'))
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});


app.use('/api/v1/user', userRoute);
app.use('/api/v1/car', carRoute);


mongoose.connect(process.env.MONGO_URL as string)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
        console.log("Connected to monogoDB");

    })
    .catch(() => {
        console.log("Couldn't connect to database")
    })
