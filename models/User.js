const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    idnum: {
        type: Number,
        require: true
    },
    firstname:{
        type: String,
        require: true
    },
    lastname:{
        type: String,
        require: true
    },
    contactnum:{
        type: Number,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    username:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
},{timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User
