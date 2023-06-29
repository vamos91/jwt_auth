const mysql = require('mysql2')

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  });

  connection.getConnection((err) => {
    if(!err){
        console.log('connecté à la DB')
    }else{
        console.log(err)
    }

  })

  module.exports = connection