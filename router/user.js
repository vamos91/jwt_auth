const express = require('express')
const router = express.Router()
const user = require('../model/user')
const {checkCredentials, hashPassword, isUserExist, getUserByEmailWithPasswordAndPassToNext, verifyToken} = require('../auth/auth')

router.get('/', user.getAllUser)
router.post('/signin', checkCredentials, getUserByEmailWithPasswordAndPassToNext, user.signin)
router.post('/signup', checkCredentials, isUserExist, hashPassword, user.signup)

router.get('/dashboard', verifyToken, (req, res) => {
    console.log('je suis dans le dashboard')
})


module.exports = router;