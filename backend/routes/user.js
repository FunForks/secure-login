const router = require('express').Router()
const register = require('./register')
const confirm = require('./confirm')
const login = require('./login')
const getid = require('./getid')


router.post('/register', register)
router.get('/confirm/:token', confirm)
router.post('/login', login)
router.post('/getid', getid)

module.exports = router

