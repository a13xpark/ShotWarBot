const mongoose =
require("mongoose");

const schema =
new mongoose.Schema({

factionId:String,

endsAt:Date,

inWar:{
type:Boolean,
default:false
}

});

module.exports =
mongoose.model(
"Cooldown",
schema
);
