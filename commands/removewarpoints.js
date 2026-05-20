const Leaderboard=
require(
"../models/Leaderboard"
);

const {
updateBoard
}=
require(
"./addpoints"
);

const STAFF=
"1493440601973194903";

module.exports={

async execute(
interaction
){

if(
!interaction.member.roles.cache.has(
STAFF
)
){

return interaction.reply({

content:
"❌ Staff only.",

ephemeral:true

});

}

const faction=
interaction.options.getRole(
"faction"
);

const points=
interaction.options.getInteger(
"points"
);

await Leaderboard.findOneAndUpdate(

{

factionId:
faction.id

},

{

$inc:{

points:
-points

}

}

);

await updateBoard(
interaction.client
);

return interaction.reply({

content:

`➖ Removed ${points} points from ${faction}`,

ephemeral:true

});

}

};