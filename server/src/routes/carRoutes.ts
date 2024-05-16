import express, {Router} from 'express'
const {verifyToken} = require('../middleware/userAuthMiddleware')

const {createCar} =  require('../controllers/carController')

const router: Router = express.Router();

router.post('/create', verifyToken, createCar)

module.exports = router