import express, {Router} from 'express'


const { createUser, loginUser } = require('../controllers/userController');
const {verifyToken} = require('../middleware/userAuthMiddleware')


const router: Router = express.Router();

router.post('/signup', createUser)

router.post('/login', loginUser)

router.get('/home', verifyToken, (req, res) => {
    res.status(200).json({
        message: 'Protected Route Accessed'
    })
})

module.exports = router