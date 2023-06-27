const express = require('express')
const app = express()
const port = 3001
require('dotenv').config()
app.use(express.json())
var cookieParser = require('cookie-parser')
app.use(cookieParser())
const userRouter = require('./router/user')
app.use('/users', userRouter)



app.get('/', (req, res) => {
    res.send('Hello from server')
})

app.listen(port, () => {
    console.log('App listen on localhost:' + port)
})