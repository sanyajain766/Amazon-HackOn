const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

router.get('/verify',auth,(req,res)=>{
    res.send({status:true})
})

router.post('/createUser',async (req,res)=>{
    const user  = new User(req.body)
    try{
        await user.save()
        res.status(201).send({user})
    }catch(e){
        res.status(400).send(e)
    }
})
router.post('/login',async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        return res.cookie('auth',token,{maxAge:360000,httpOnly:true,secure:false,path:"/"}).json(user)    
        
    }
    catch(e){
        res.status(400).send({error:e.message})
    }
})
router.get('/logout',auth,(req,res)=>{
    try{
        return res.clearCookie("auth").status(200).send()
    }
    catch(e){
        console.log(e)
        res.status(400).send()
    }
    
})

module.exports = router