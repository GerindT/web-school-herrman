var     express             = require("express"),
        app                 = express (),
        bodyParser          = require('body-parser'),
        mongoose            = require("mongoose"),
        passport            = require("passport"),
        LocalStrategy       = require("passport-local"),
        methodOverride      = require("method-override"),
        flash               = require("connect-flash")

//dbmodels
var     Aktivitetet  = require("./models/aktivitetet");
var     Diplomat  = require("./models/diplomat");
var     User  = require("./models/user");

//routes
var     aktivitetetRoutes       = require("./routes/aktivitetet");
var     diplomatRoutes       = require("./routes/diplomat");
var     indexRoutes       = require("./routes/index");

//mongodb
var url=process.env.DATABASEURL||"mongodb://localhost:27017/geri_shkolla";
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false});

//static folders/bodyparser
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static('assets'));
app.use(express.static('images'));
app.use(methodOverride("_method"));
app.use(flash());


app.use(require("express-session")({
    secret:"Geri",
    resave:false,
    saveUninitialized:false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
})

//routes
app.use("/aktivitetet",aktivitetetRoutes);
app.use("/diplomat",diplomatRoutes);
app.use(indexRoutes);


const port= process.env.PORT||3000;

app.listen(port,function(){
    console.log("Started");
});
