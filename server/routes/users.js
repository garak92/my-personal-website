const express = require('express')
const usersRouter = express.Router()
const usersController = require('../controllers/users')
const isAuthorized = require('../middleware/auth')

usersRouter.post('/changepassword', [isAuthorized], usersController.changePassword)
usersRouter.post('/login', usersController.login)

module.exports = usersRouter