const History=
require(
"../models/WarHistory"
);

const Points=
require(
"../models/Leaderboard"
);

const {
EmbedBuilder
}=
require(
"discord.js"
);

module.exports={

async execute(
interaction
){

const faction=
interaction.options.getRole(
"faction"
);

const history=
await History.findOne({

factionId:
faction.id

});

const points=
await Points.findOne({

factionId:
faction.id

});

const embed=
new EmbedBuilder()

.setColor(
"#22A8FF"
)

.setTitle(
`📖 ${faction.name}`
)

.setDescription(

`⚔️ Wars
${
history?.wars
||
0
}

🏆 Wins
${
history?.wins
||
0
}

💀 Losses
${
history?.losses
||
0
}

🎯 Points
${
points?.points
||
0
}`

);

interaction.reply({

embeds:[
embed
]

});

}

};