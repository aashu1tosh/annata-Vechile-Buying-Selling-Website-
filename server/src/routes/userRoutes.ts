import express, {Router} from 'express'


const { createUser, loginUser, auth } = require('../controllers/userController');
const {verifyToken} = require('../middleware/userAuthMiddleware')


const router: Router = express.Router();
const jwt = require('jsonwebtoken')

router.post('/signup', createUser)

router.post('/login', loginUser)

// router.get('/home', verifyToken, (req, res) => {
//     res.status(200).json({
//         message: 'Protected Route Accessed'
//     })
// })

router.get('/auth', auth)

module.exports = router