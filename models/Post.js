const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PostSchema = new schema({
    user:{
        type:schema.Types.ObjectId,
        ref:'users' 
    },
    text:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    avatar:{
        type:String
    },
    likes:[
        {
            user:{
                type:schema.Types.ObjectId,
                ref:'users'
            },
        }
    ],
    comments:[
        {
            user:{
                type:schema.Types.ObjectId,
                ref:'users'
            },
            text:{
                type:String,
                required:true
            },
            date:{
                type:Date,
                default:Date.now
            },
            name:{
                type:String
            },
            avatar:{
                type:String
            }
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }
});
module.exports = Post = mongoose.model('post',PostSchema);