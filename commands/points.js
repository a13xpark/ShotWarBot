const Leaderboard=
require(
"../models/Leaderboard"
);

module.exports={

async execute(
interaction
){

const faction=
interaction.options.getRole(
"faction"
);

const data=
await Leaderboard.findOne({

factionId:
faction.id

});

return interaction.reply({

content:

`${faction}

🏆 Points:
${data?.points || 0}`

});

}

};