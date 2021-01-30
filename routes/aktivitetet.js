var express = require("express");
var router = express.Router({mergeParams:true});
var Aktivitetet = require("../models/aktivitetet");
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
    

    Aktivitetet.find({},function(err,allAktivitetet){
        if(err){
            console.log(err)
        }
        else{
            res.render("aktivitetet/index",{aktivitetet:allAktivitetet});
        }
    })
});

router.post("/",upload.single('image'),middleware.isLoggedIn,function(req,res){
    var title = req.body.title;
    var image = req.file.path;
    var description = req.body.description;
    var newAktivitetet = {title:title, image: image ,description:description};
    //CREATE NEW AKT AND SAVE IT TO DB

    Aktivitetet.create(newAktivitetet,function(err,element){
        if(err){
            console.log(err);
        }
        else{
            console.log(element)
            res.redirect("/aktivitetet");
        }

    })
    
});
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("aktivitetet/new");
});

router.get("/:id/edit",middleware.isLoggedIn,function(req,res){

    Aktivitetet.findById(req.params.id,function(err,foundaktivitetet){
        
    
       
        res.render("aktivitetet/edit",{aktivitetet :foundaktivitetet});
     
   
});
})


router.put("/:id",upload.single('image'),middleware.isLoggedIn, function(req,res){

if(req.file ){
var image = req.file.path;
var title = req.body.title;
var description = req.body.description;
var upAktivitetet = {title:title, image: image ,description:description};
}
else{

    var title = req.body.title;
var description = req.body.description;

var upAktivitetet = {title:title ,description:description};
}



Aktivitetet.findByIdAndUpdate(req.params.id,upAktivitetet,function(err,updatedAkt){
if(err){
    res.redirect("/");
}
else{
    res.redirect("/aktivitetet");
}
})
});

router.delete("/:id",middleware.isLoggedIn,function(req,res){
    Aktivitetet.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/");
        }
        else{
            res.redirect("/aktivitetet");
        }
    })
});

module.exports= router;