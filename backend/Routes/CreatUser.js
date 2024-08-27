const express = require('express')
const router = express.Router();
const User = require('../models/User')
const {body,validationResult } =require ('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = 'MynameisEndtoEndYouTubeChannel$#'

router.post("/signupUser",[
    body('email').isEmail(),
    body('name',"write Big Name").isLength({min:5}),
    body('password').isLength({min:5})

],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt);

    try{
        await User.create({

            name:req.body.name,
            password:secPassword,
            location:req.body.location,
            email:req.body.email
        })

        res.json({success:true});
    }
    catch(err){
        console.log(err);
        console.log("This is error");
        console.log(req.body);
        res.json({success:false});
    }
})

//for loginuser
router.post("/loginUser",[
    body('email').isEmail(),
    body('password').isLength({min:5})

], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    let email=req.body.email;
    try{
        let userData=await User.findOne({email});
        if(!userData){
            return res.status(400).json({ errors:"Try logging with correct Email"});
        }

        const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
        if(!pwdCompare){
            return res.status(400).json({ errors:"Try logging with correct Password"});
        }
        
        const data ={
            user: {
                id:userData.id
            }
        }

        const authToken= jwt.sign(data,jwtSecret)

        return res.json({ success:true,authToken});
    }
    catch(err){
        console.log(err);
        console.log("This is error");
        // console.log(req.body);
        res.json({success:false});
    }
})


module.exports =  router;