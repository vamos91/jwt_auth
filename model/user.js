const connection = require('../database/connection')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const getAllUser = (req, res) => {
   connection.query('SELECT * FROM users', (err, results, fields) => {
        if(!err){
            res.status(200).json({users: results})
        }else{
            console.log(err)
        }
   })
}

const signin = async (req, res) => {
   console.log(req.user.hashedPassword)
   try {
    if (await argon2.verify(req.user.hashedPassword, req.body.password)) {
        const token = jwt.sign({ "iss": "JWT Course", "expiresIn": '1h', "aud": "https://www.wildcodeschool.com/",
        "sub": req.user.id, "role": "admin" }, process.env.SECRET_JWT
       )
        res.cookie('userCookie', token).status(200).json({user: req.user.firstname})
    } else {
        console.log('password not ok')
    }
  } catch (err) {
    console.log(err)
  }
}

 const signup = (req, res) => {
    const {firstname, lastname, email, city, language} = req.body
    connection.query('insert into users (firstname, lastname, email, city, language, hashedPassword) values (?,?,?,?,?,?)', [firstname, lastname, email, city, language, req.hashedPassword], (err, result, fields) => {
        if(!err){
            res.status(200).json(result)
        }else{
            console.log(err)
        }
    })

 } 

module.exports = {getAllUser, signin, signup}