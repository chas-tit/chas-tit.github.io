const { request } = require('express');
const express = require('express');
const User = require('../models/User')
var flash = require('connect-flash')
const router = express.Router();
const bcrypt = require('bcryptjs')



router.get('/', (req, res) =>{
    res.render('index')
})

router.get('/register', (req, res) =>{
    res.render('register')
})
router.get('/login', (req, res,) =>{
   res.render('login',{message: req.flash()})
    
            

})

router.get('/home', (req, res) =>{
    User.find((err, docs) =>{
        res.render('home', {users: docs, message: req.flash()})
    }).catch(err =>{
        console.log('errored')
    })
})

router.get('/edit/:id', (req, res, next) =>{
    console.log(req.params.id)
    User.findOneAndUpdate({_id: req.params.id}, req.body, {new:true},(err, docs) =>{
        if(err){
            console.log('errored')
            next(err);
        }else{
            res.render('edit', {users: docs});
        } 
    })
})
router.post('/edit/:id', (req, res, next) =>{
    
    User.findByIdAndUpdate({_id: req.params.id}, req.body,(err, docs) =>{
    

       
            
        if(err){
            console.log('huerrored')
            next(err);
        }else{
            
            res.redirect('/home')
        } 
    })
})

router.get('/delete/:id', (req, res, next) =>{
   
    User.findByIdAndDelete({_id: req.params.id}, (err, docs) =>{
        if(err){
            console.log('errored')
            next(err);
        }else{
            console.log('dededededesususu')
            res.redirect('/home')
        } 
    })
})
module.exports = router;