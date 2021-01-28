
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const flash = require('../routes/page')
const { request } = require('express')





const register = (req, res, next) =>{
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }


        let user = new User({
            idnum: req.body.idnum,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            contactnum: req.body.contactnum,
            address: req.body.address,
            username: req.body.username,
            password: hashedPass
        })

        user.save((err) =>{
            if(err){
                console.log("errored")
            }else{
                console.log("registered")
                res.redirect('/login')
            }
        })
            
    })
}


const login = (req, res, next ) => {
    var usernames = req.body.username
    var password = req.body.password


    User.findOne({username: usernames})
    .then(user => {
        if (user) {
            bcrypt.compare(password, user.password, function(err, result ) {
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({firstname: user.firstname}, 'SecretValue', {expiresIn: '1h'})
                    req.flash('success', 'Login successfully.')
                    res.redirect('/home')
                    
                }else{
                    req.flash('error', 'Unregister account.')
                    res.redirect('/login')
                }
            })
            
        }else {
            req.flash('error', 'Unregister account.')
                    res.redirect('/login')
        }
    })
    
}



module.exports = { register, login}