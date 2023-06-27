const mysql = require('mysql2')

const connection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
  });

  connection.getConnection((err) => {
    if(!err){
        console.log('connecté à la DB')
    }else{
        console.log(err)
    }

  })

  module.exports = connection