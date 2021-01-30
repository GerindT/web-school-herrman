var middlewareObj={};

var     Aktivitetet         = require("../models/aktivitetet"),
        Diplomat             = require("../models/diplomat")

        middlewareObj.isLoggedIn= function(req,res,next){
    
            if(req.isAuthenticated()){
                return next();
            }
            else{
            req.flash("error", "You need to be logged in to do that");
            res.redirect("/login");
            }
        }
    
    
    
        module.exports=middlewareObj