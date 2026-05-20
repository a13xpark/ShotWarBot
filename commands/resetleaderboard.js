const Leaderboard=
require(
"../models/Leaderboard"
);

const OWNER=
"1466810254376440024";

const {
updateBoard
}=
require(
"./addpoints"
);

module.exports={

async execute(
interaction
){

if(
interaction.user.id
!==OWNER
){

return interaction.reply({

content:
"❌ Only you can reset monthly leaderboard.",

ephemeral:true

});

}

await Leaderboard.deleteMany(
{}
);

await updateBoard(
interaction.client
);

return interaction.reply({

content:

"✅ Monthly leaderboard reset.",

ephemeral:true

});

}

};