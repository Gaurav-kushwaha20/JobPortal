const { UserSighUp } = require('../controller/UserController')

const router = require('express').Router()

router.get('/register', UserSighUp)

module.exports  = router