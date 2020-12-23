const { Router } = require('express');
const express = require('express');
const router = express.Router();
const {check,validationResult} = require("express-validator");

//@route  POST api/users
//@des    post resister users
//@access public
router.post("/",[
    check("name",'name is required').not().isEmpty(),
    check("email",'email is required').isEmail(),
    check("password",'password should be more than or equal 6 characters').isLength({min:6})
],(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    res.send("users route");
});
module.exports = router;