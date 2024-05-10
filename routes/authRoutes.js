const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')

router.get('/login', AuthController.login)
router.post('/login', AuthController.loginUser)
router.get('/register', AuthController.register)
router.post('/register', AuthController.registerUser)
router.get('/logout', AuthController.logoutUser)

module.exports = router