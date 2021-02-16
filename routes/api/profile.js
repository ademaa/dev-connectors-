const express = require('express');
const router = express.Router();
const config = require('config');
const request = require('request');
const auth  = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User  = require('../../models/User');
const Post  = require('../../models/Post');
const {check,validationResult} = require('express-validator');
const { rawListeners } = require('../../models/Profile');
//@route  GET api/profile/me
//@des    get current user profile 
//@access private
router.get("/me",auth,async(req,res)=> {
    try{
        const profile  = await  Profile.findOne({user: req.user.id}).populate(
            'user',
        ['name','avatar']
        );
        if(!profile){
            return res.status(400).json({msg:"profile of user is not created yet!"});
        }
        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send("server error");
    }
});

//@route  POST api/profile
//@des    post profile data of user
//@access private
router.post("/",[auth,
    [
        check("status","status is required").not().isEmpty(),
        check("skills","skills is required").not().isEmpty()
    ]],
    async (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const {
            comapny,
            website,
            location,
            status,
            skills,
            bio,
            githubUserName,
            youtube,
            facebook,
            linkedin,
            twitter,
            instagram
        } = req.body;
        let profileFields = {};
        profileFields.user = req.user.id;
        if(comapny) profileFields.comapny = comapny;
        if(website) profileFields.website = website;
        if(location) profileFields.location = location;
        if(status) profileFields.status = status;
        if(bio) profileFields.bio = bio;
        if(githubUserName) profileFields.githubUserName = githubUserName;
        if(skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }
        profileFields.social = {}
        if(youtube) profileFields.social.youtube = youtube;
        if(facebook) profileFields.social.facebook = facebook;
        if(linkedin) profileFields.social.linkedin = linkedin;
        if(twitter) profileFields.social.twitter = twitter;
        if(instagram) profileFields.social.instagram = instagram;

        try{
            let profile  = await Profile.findOne({user:req.user.id});
            if(profile){
                profile = await Profile.findOneAndUpdate({user: req.user.id},
                    {$set:profileFields},
                    {new:true}
                    );
                    return res.json(profile);
            }
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);
        }catch(err){
            console.error(err.message);
            res.status(500).send("server error");
        }
});

//@route  GET api/profile
//@des    get all profiles
//@access public
router.get("/",async(req,res)=>{
    try {
        const profiles = await Profile.find().populate('user',['name','avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

//@route  GET api/profile/user/:user-id
//@des    get profile by user id
//@access public

router.get("/user/:user_id",async(req,res)=>{
    try {
        const userProfile = await Profile.findOne({user:req.params.user_id})
        .populate('user',
        ["name","avatar"]);
        if(!userProfile){
            return res.status(400).json({msg:"profile not found"});
        }
        res.json(userProfile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});
//@route  DELETE api/profile
//@des    DELETE  profile
//@access public
router.delete("/",auth,async(req,res)=>{
    try {
        //remove posts
        await Post.deleteMany({user:req.user.id});
        //remove profile
         await Profile.findOneAndRemove({user:req.user.id});
         //remove user 
         await User.findOneAndRemove({ _id :req.user.id});
        res.json({msg:"user has been removed"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});
//@route  PUT api/profile/experience
//@des    add experience
//@access private
router.put("/experience",[auth,[
    check("title",'title is required').not().isEmpty(),
    check("company",'company is required').not().isEmpty(),
    check("from",'from is required').not().isEmpty(),
]],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    };
    const {title,company,location,from,to,current} = req.body;
    const newExpr = {
        title:title,
        company:company,
        location:location,
        from:from,
        to:to,
        current:current
    }
    try {
        const profile = await Profile.findOne({user:req.user.id});
        profile.experience.unshift(newExpr);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});
//@route  DELETE api/profile/experience/:exp_id
//@des    remove experience
//@access private
router.delete('/experience/:exp_id',auth,async(req,res)=>{
try {
    const profile = await Profile.findOne({user:req.user.id});
    const removeIndex = profile.experience
    .map(item => item.id)
    .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex,1);
    await profile.save();
    res.json(profile);
} catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
}
});

//@route  PUT api/profile/education
//@des    add education
//@access private
router.put("/education",[auth,[
    check("school",'school is required').not().isEmpty(),
    check("degree",'degree is required').not().isEmpty(),
    check("start",'start is required').not().isEmpty(),
]],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    };
    const {school,
        degree,
        start,
        end,
        grade,
        Description
    } = req.body;
    const newEdu = {
        school,
        degree,
        start,
        end,
        grade,
        Description
    }
    try {
        const profile = await Profile.findOne({user:req.user.id});
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});
//@route  DELETE api/profile/education/:edu_id
//@des    remove education
//@access private
router.delete('/education/:edu_id',auth,async(req,res)=>{
try {
    const profile = await Profile.findOne({user:req.user.id});
    const removeIndex = profile.education
    .map(item => item.id)
    .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex,1);
    await profile.save();
    res.json(profile);
} catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
}
});

//@route  PUT api/profile/certifications
//@des    add certifications
//@access private
router.put("/certifications",[auth,[
    check("name",'name is required').not().isEmpty(),
    check("organization",'organization is required').not().isEmpty(),
    check("start",'start is required').not().isEmpty(),
]],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    };
    const {
        name,
        start,
        end,
        expiration,
        organization
    } = req.body;
    const newCer = {
        name,
        start,
        end,
        expiration,
        organization
    }
    try {
        const profile = await Profile.findOne({user:req.user.id});
        profile.certifications.unshift(newCer);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});
//@route  DELETE api/profile//:cer_id
//@des    remove certifications
//@access private
router.delete('/certifications/:cer_id',auth,async(req,res)=>{
try {
    const profile = await Profile.findOne({user:req.user.id});
    const removeIndex = profile.certifications
    .map(item => item.id)
    .indexOf(req.params.cer_id);

    profile.certifications.splice(removeIndex,1);
    await profile.save();
    res.json(profile);
} catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
}
});
//@route  GET api/profile/github/:username
//@des    get user repos github
//@access public
router.get("/github/:username",(req,res)=>{
    try {
        const options = {
            uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&
            sort=created:asc&client_id=${config.get('githubClientID')}&client_secret=
            ${config.get('githubSercret')}`,
            method:'GET',
            headers:{'user-agent':'node.js'}
        };
        request(options,(error,response,body)=>{
            if(error) console.error(error);
            if(response.statusCode !== 200){
                return res.status(404).json({msg:"no github profile found"});
            }
            res.json(JSON.parse(body));
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})
module.exports = router;