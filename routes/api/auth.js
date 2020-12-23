const express = require('express');
const router = express.Router();
//@route  GET api/auth
//@des    test auth
//@access public
router.get("/",(req,res) => res.send("auht route"));
module.exports = router;