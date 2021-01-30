var mongoose= require("mongoose");
mongoose.set('debug',true);
var diplomatSchema= new mongoose.Schema({
    title:String,
    image:String,
    description:String

});

module.exports= mongoose.model("Diplomat",diplomatSchema);