const mongoose =
require("mongoose");

const factionSchema =
new mongoose.Schema({

name:{
type:String,
unique:true
},

points:{
type:Number,
default:0
}

});

module.exports =
mongoose.model(
"Faction",
factionSchema
);