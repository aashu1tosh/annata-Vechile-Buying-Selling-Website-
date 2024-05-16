import express, {Router} from 'express'


const { createUser, loginUser, getRole, getAll, deleteUser, changePassword} = require('../controllers/userController');
const {verifyToken} = require('../middleware/userAuthMiddleware')


const router: Router = express.Router();
// const jwt = require('jsonwebtoken')

router.post('/signup', createUser)

router.post('/login', loginUser)

router.get('/role', verifyToken, getRole);

router.get('/getall', verifyToken, getAll);

router.delete('/deleteuser/:id', verifyToken, deleteUser);

router.put('/changepassword/:id', verifyToken, changePassword);

module.exports = router