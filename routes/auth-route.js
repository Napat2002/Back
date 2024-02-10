const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const authController = require('../controllers/auth-controller')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/me', authenticate, authController.getme) 

module.exports = router