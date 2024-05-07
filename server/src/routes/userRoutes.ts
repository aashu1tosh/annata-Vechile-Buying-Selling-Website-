import express, {Router, Request, Response} from 'express'


const { createUser, loginUser, getRole } = require('../controllers/userController');
const {verifyToken} = require('../middleware/userAuthMiddleware')


const router: Router = express.Router();
// const jwt = require('jsonwebtoken')

router.post('/signup', createUser)

router.post('/login', loginUser)

// router.get('/auth', verifyToken, (req:Request, res:Response) => {
//     res.status(200).json({
//         message: 'Protected Route Accessed'
//     })
// })

router.get('/role', verifyToken, getRole)


module.exports = router