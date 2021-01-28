const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser =  require('body-parser')
const session = require('express-session')
const cookieParser = require("cookie-parser");
const flash = require('connect-flash')
const authroute = require('./routes/auth')
const pageroute = require('./routes/page')
const bcrypt = require('bcryptjs')
// var flash = require('express-flash-messages')


const app = express() 

mongoose.connect('mongodb://localhost:27017/testdb', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
const db = mongoose.connection

db.on('error', (err) => {

    console.log(err)
})

db.once('open', () => { 
    console.log('Database connection establihesd')
})



app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(express.static('public'))
app.set('view engine', 'ejs')


app.use(session({
    secret: 'secret',
    cookie: {maxAge : 60000},
    resave: false,
    saveUninitialized: false
}))
 app.use(flash())



// routes
app.use('/', require('./routes/page'))
app.use('/auth', require('./routes/auth'))
app.use('/home', require('./routes/page'))





const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
}) 

