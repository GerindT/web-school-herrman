var mongoose= require("mongoose");
mongoose.set('debug',true);
var aktivitetetSchema= new mongoose.Schema({
    title:String,
    image:{type:Buffer},
    description:String

});

module.exports= mongoose.model("Aktivitetet",aktivitetetSchema);