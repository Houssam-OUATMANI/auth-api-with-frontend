const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/database/schema')
const {registerValidation, loginValidation} = require('../validation/validation')

// simple Get Routes
router.get('/register', (req, res)=>{
    res.render('register')
})
router.get('/login', (req, res)=>{
    res.render('login')
})


// Register
router.post('/register' ,async (req,res)=>{
// JOI VALIDATION
 const {error} = registerValidation(req.body)
 if (error) return res.status(400).render('error400', {message : error.details[0].message })
 
// email already registered

const registeredEmail = await User.findOne({email : req.body.email})
 if(registeredEmail) return res.status(400).render('error400', {message : 'Email Already Registered'})

 try {
    const salt =  await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash( req.body.password, salt)
    let newUser = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
    })
    newUser.save()
    .then(()=>{
         console.log('succesufully saved')
         res.render('success' , {message : 'Succesfully registered'})
        })
    .catch(err => {
        console.log(err.errors)
        if (err.errors['name']){
            res.status(400).render('error400' ,{message : err.errors['name']})
        }  
        if  (err.errors['email']){
            res.status(400).render('error400' ,{message : err.errors['email']})
        }
        if  (err.errors['password']){
            res.status(400).render('error400' ,{message : err.errors['password']})
        }
    })

} catch (error) {
    console.log(error)
}
   
})


// Login

router.post('/login', async (req ,res)=>{
    // if data is valid
    const {error} = loginValidation(req.body)
    if (error) res.status(400).render('error400', {message :  error.details[0].message})

    // if email is not registered
    const registeredEmail = await User.findOne({email : req.body.email})
    if(!registeredEmail) return res.status(400).render('error400', {message : 'Email  is invalid'})

    // if password is matching the registered one
    const matchingPassword = await bcrypt.compare(req.body.password, registeredEmail.password)
    if(!matchingPassword) return res.status(400).render('error400', {message : ' password is invalid'})

    res.status(200).render('success', {message : 'You are logged in'})
})




module.exports = router