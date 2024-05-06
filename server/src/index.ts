import express, {Request, Response} from 'express'
import mongoose, { models } from 'mongoose';


const dotenv = require('dotenv')
const cors = require('cors')
const userRoute = require('./routes/userRoutes')


dotenv.config();
const app = express();

const port = process.env.BACKEND_PORT 
app.use(express.json())
app.use(cors())
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});


app.use('/api/v1/user', userRoute)


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
