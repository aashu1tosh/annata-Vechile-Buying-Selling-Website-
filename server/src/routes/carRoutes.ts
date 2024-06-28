import express, { Router } from 'express';
const { verifyToken } = require('../middleware/userAuthMiddleware')

const { createCar, getAddedCars, getAllCars, getParticularCar, deletecar } = require('../controllers/carController')

const router: Router = express.Router();

router.post('/create', verifyToken, createCar)
router.get('/viewaddedcars', verifyToken, getAddedCars)

router.get('/getallcars', verifyToken, getAllCars)
router.get('/:id', verifyToken, getParticularCar)
router.delete('/:id', verifyToken, deletecar)



module.exports = router