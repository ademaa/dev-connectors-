const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const {check,validationResult} = require('express-validator');
//@route  GET api/auth
//@des    test auth
//@access public
router.get("/",auth,async(req,res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
router.post("/",[
    check("email","email is required").isEmail(),
    check("password","password is required").exists()
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty){
        res.status(401).json({errors:errors.array()});
    }
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:"invalid credintials"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:"invalid credintials"});
        }
        const payload = {
            user:{
                id:user.id
            }
        }
        jwt.sign(payload,
            config.get("jwtSecret"),
            {expiresIn:360000},
            (err,token)=>{
            if(err) throw err;
            res.send(token);
        })
    }catch(err){
        console.error(err.message);
        res.status(500).send("server error");
    }
});
module.exports = router;