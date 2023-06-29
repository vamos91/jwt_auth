const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const path = require('path')
require('dotenv').config()
app.use(express.json())
var cookieParser = require('cookie-parser')
app.use(cookieParser())
const userRouter = require('./router/user')
app.use('/users', userRouter)

app.use(express.static(path.join(__dirname, 'client/build')))
const pathToFile = path.join(__dirname, 'client/build')

app.get('/', (req, res) => {
    res.sendFile(pathToFile, 'index.html')
})

app.listen(port, () => {
    console.log('App listen on localhost:' + port)
})