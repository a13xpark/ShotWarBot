const mongoose =
require(
"mongoose"
);

const schema =
new mongoose.Schema({

factionId:String,

factionName:String,

wins:{
type:Number,
default:0
},

losses:{
type:Number,
default:0
},

wars:{
type:Number,
default:0
}

});

module.exports=
mongoose.model(
"WarHistory",
schema
);