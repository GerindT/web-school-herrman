var express = require("express");
var router = express.Router({mergeParams:true});
var passport = require("passport");
var User = require("../models/user");

router.get('/',function(req,res){
    res.render("index");
});

router.get('/studim',function(req,res){
    res.render("studim");
});
router.get('/sherbimet',function(req,res){
    res.render("sherbimet");
});

router.get('/login',function(req,res){
    res.render("login");
})

router.post("/login",passport.authenticate("local",{
    successReturnToOrRedirect:"/",
            failureRedirect:"/login"
        }),function(req,res){  
});

router.get("/logout", function(req,res){
    req.logOut();
    req.flash("success","Logged you out!");
    res.redirect("/");
})

// add a new admin 
// router.get("/register",function(req,res){
//     res.render("register");
// })

// router.post("/register",function(req,res){
//     var newUser = new User({username: req.body.username})
//     User.register(newUser, req.body.password, function(err,user){
//         if(err){
//             req.flash("error", err.message);
//             return res.render("register");
//         }
//         else{
//             passport.authenticate("local")(req,res,function(){
//                 req.flash("success");
//                 res.redirect("/");
//             })
//         }
//     })
// });


module.exports= router;