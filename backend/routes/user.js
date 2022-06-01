const router = require('express').Router()
const register = require('./register')
const confirm = require('./confirm')
const login = require('./login')

router.post('/register', register)
router.get('/confirm/:token', confirm)
router.post('/login', login)

module.exports = router

