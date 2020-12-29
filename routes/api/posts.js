const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check,validationResult} = require('express-validator');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route  post api/posts
//@des    post a new post
//@access private
router.post("/",[auth,[
    check('text','text is required').not().isEmpty()
]],async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        const user  = await User.findById(req.user.id).select("-password");
        const newPost = new Post({
            text:req.body.text,
            avatar:user.avatar,
            name:user.name,
            user:req.user.id
        });
        const post = await newPost.save();
        res.json(post);
        
    } catch (err) {
        console.error(err.meassage);
        res.status(500).send("server error");
    }
});

//@route  GET api/posts
//@des    get all posts
//@access private

router.get("/",auth,async(req,res)=>{
    try {
        const posts = await Post.find().sort({date:-1});
        if(!posts){
            return res.status(404).json({msg:"not posts found"});
        }
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

//@route  GET api/posts/:id
//@des    get post by id
//@access private

router.get("/:id",auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg:"post not found"});
        }
        res.json(post);
    } catch (err) {
        console.error(err.message);
        if(err.kind ==='ObjectId'){
            return res.status(404).json({msg:"post not found"});
        }
        res.status(500).send("server error");
    }
});

//@route  Delete api/posts/:id
//@des    delete post by id
//@access private

router.delete("/:id",auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg:"post not found"});
        }
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg:"user not authorized"});
        }
        await post.remove();
        res.json({msg:"post removed"});
    } catch (err) {
        console.error(err.message);
        if(err.kind ==='ObjectId'){
            return res.status(404).json({msg:"post not found"});
        }
        res.status(500).send("server error");
    }
});

//@route  put api/posts/like/:id
//@des    like post by id
//@access private
router.put("/like/:id",auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        //check if post has already been liked by user
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg:"post already liked"});
        }
        post.likes.unshift({user:req.user.id});
        
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.err(err.message);
        res.status(500).send("server error");
    }
});

//@route  put api/posts/unlike/:id
//@des    unlike post by id
//@access private
router.put("/unlike/:id",auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        //check if post has already been liked by user
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg:"post already unliked"});
        }
        const removeIndex = post.likes.map(like=>like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex,1);
        
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.err(err.message);
        res.status(500).send("server error");
    }
});
//@route  post api/posts/comment/:id
//@des    post new comment 
//@access private
router.post("/comment/:id",[auth,[
    check("text","text is required").not().isEmpty()
]],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errrors:errors.array()});
    }
    try {
        const post = await Post.findById(req.params.id);
        const user = await  User.findById(req.user.id).select("-password");
        const newComment ={
            text:req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:req.user.id
        };
        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});
//@route  delete api/posts/comment/:id/:comment_id
//@des    delete current comment 
//@access private
router.delete("/comment/:id/:comment_id",auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
       const comment = post.comments.find(comment=> comment.id === req.params.comment_id);
       if(!comment){
           return res.status(404).json({msg:"comment not found"});
       }
       if(comment.user.toString()!==req.user.id){
           return res.status(401).json({msg:"user is not authorized"});
       }
       const removeIndex = post.comments.map(comment=>comment.user.toString()).indexOf(req.user.id);
       post.comments.splice(removeIndex,1);
       await post.save();
       res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})
module.exports = router;