const mongoose =
require("mongoose");

const schema =
new mongoose.Schema({

factionId:String,

factionName:String,

points:{
type:Number,
default:0
}

});

module.exports =
mongoose.model(
"Leaderboard",
schema
);