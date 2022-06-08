const router = require('express').Router()
const register = require('./register')
const confirm = require('./confirm')
const login = require('./login')
const check = require('./check')


router.post('/register', register)
router.get('/confirm/:token', confirm)
router.post('/login', login)
router.get('/check', check)

module.exports = router

