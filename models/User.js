const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required
    },
    email:{
        type:String,
        required,
        unique
    },
    passsword:{
        type:String,
        required
    },
    avatar:{
        type:String
    }
})
mongoose.model.export = User = mongoose.model("User",userSchema);