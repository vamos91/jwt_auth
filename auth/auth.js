const argon2 = require('argon2')
const connection = require('../database/connection')
const jwt = require('jsonwebtoken')

const checkCredentials = (req, res, next) => {
    const {email, password} = req.body
    if(email !== undefined && password !== undefined){
       next()
    }else{
        console.log('empty email or password')
    }
}

const hashPassword = async (req, res, next) => {
    const {password} = req.body
    try {
        const hash = await argon2.hash(password);
        req.hashedPassword = hash
        next()
       delete req.body.password
      } catch (err) {
        console.log(err)
      }
}

const isUserExist = (req, res, next) => {
    connection.query('select * from users where email=?', [req.body.email], (err, result, fields) => {
        if(result.length <= 0){
            next()
        }else{
            res.json({message: 'User already exist'})
        }
    })
 }

 const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
    connection.query('select * from users where email=?', [req.body.email], (err, result, fields) => {
        if(!err && result.length > 0){
            req.user = result[0]
            next()
        }else{
            res.status(404).json({message: 'User not found'})
        }
    })
 }

 const verifyToken = (req, res, next) => {

    console.log(req.cookies.userCookie)  
    try {
        var decoded = jwt.verify(req.cookies.userCookie, process.env.SECRET_JWT);
        console.log(decoded)
        next()
    } catch (error) {
        console.log(error)
    }


    // const auth = req.headers.authorization
    // if(auth !== null){
    //     const arrayToken = auth.split(' ')
    //     if(arrayToken[0] === 'Bearer'){
    //         console.log(arrayToken[1])
    //         try {
    //             var decoded = jwt.verify(arrayToken[1], process.env.SECRET_JWT);
    //             console.log(decoded)
    //             next()
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    // }
 }



module.exports = {checkCredentials, hashPassword, isUserExist, getUserByEmailWithPasswordAndPassToNext, verifyToken}

