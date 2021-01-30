var express = require("express");
var router = express.Router({mergeParams:true});
var Diplomat = require("../models/diplomat");
var middleware=require("../middleware");
const multer = require('multer');




const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        const now = new Date().toISOString(); const date = now.replace(/:/g, '-'); cb(null, date + file.originalname);
    }
});
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

router.get('/',function(req,res){
    

    Diplomat.find({},function(err,allDiplomat){
        if(err){
            console.log(err)
        }
        else{
            res.render("diplomat/index",{diplomat:allDiplomat});
        }
    })
});

router.post("/",upload.single('image'),middleware.isLoggedIn,function(req,res){
    var title = req.body.title;
    var image = req.file.path;
    var description = req.body.description;
    var newDiplomat = {title:title, image: image ,description:description};
    //CREATE NEW AKT AND SAVE IT TO DB

    Diplomat.create(newDiplomat,function(err,element){
        if(err){
            console.log(err);
        }
        else{
            console.log(element)
            res.redirect("/diplomat");
        }

    })
    
});
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("diplomat/new");
});

router.get("/:id/edit",middleware.isLoggedIn,function(req,res){

    Diplomat.findById(req.params.id,function(err,foundDiplomat){
        
    
       
        res.render("diplomat/edit",{diplomat :foundDiplomat});
     
   
});
})


router.put("/:id",upload.single('image'),middleware.isLoggedIn, function(req,res){

if(req.file ){
var image = req.file.path;
var title = req.body.title;
var description = req.body.description;
var upDiplomat = {title:title, image: image ,description:description};
}
else{

    var title = req.body.title;
var description = req.body.description;

var upDiplomat = {title:title ,description:description};
}



Diplomat.findByIdAndUpdate(req.params.id,upDiplomat,function(err,updatedDip){
if(err){
    res.redirect("/");
}
else{
    res.redirect("/diplomat");
}
})
});

router.delete("/:id",middleware.isLoggedIn,function(req,res){
    Diplomat.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/");
        }
        else{
            res.redirect("/diplomat");
        }
    })
});

module.exports= router;