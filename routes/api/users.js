const { Router } = require('express');
const express = require('express');
const router = express.Router();
const {check,validationResult} = require("express-validator");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
//@route  POST api/users
//@des    post resister users
//@access public
router.post("/",[
    check("name",'name is required').not().isEmpty(),
    check("email",'email is required').isEmail(),
    check("password",'password should be more than or equal 6 characters').isLength({min:6})
],async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {name,email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(user){
            return res.status(400).send("user already exists");
        }
        let avatar = gravatar.url(email,{
            s:"200",
            r:"pg",
            d:"mm"
        });
        user = User({
            name,
            email,
            avatar,
            password
        });
        const salt  = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        await user.save();
        const payload = {
            user:{
                id: user.id
            }
        };
        jwt.sign(
            payload,
            config.get("jwtSecret"),
            {expiresIn:360000},
            (err,token)=> {
                if(err) throw err;
                res.json({
                    token
                })
            });
    }catch(err){
        console.error(err.message);
        res.status(500).send("server error");
    }
    
});
module.exports = router;