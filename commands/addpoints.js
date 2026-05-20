const Leaderboard =
require(
"../models/Leaderboard"
);

const {
EmbedBuilder
}=
require(
"discord.js"
);

const STAFF =
"1493440601973194903";

const CHANNEL =
"1496970512587558962";

async function updateBoard(
client
){

const board=
await Leaderboard.find()

.sort({
points:-1
});

const top=
board.slice(
0,
10
);

const medals=[

"🥇",

"🥈",

"🥉",

"<:four:1478637801879638152>",

"<:five:1478637820623978698>",

"<:six:1506529111408119868>",

"<:seven:1506529133075759165>",

"<:eight:1506529149257384006>",

"<:nine:1506529164717588551>",

"<:ten:1506529568457101342>"

];

const now=
new Date();

const fullDate=
now.toLocaleDateString(
"en-US",
{
month:"long",
day:"numeric",
year:"numeric"
}
);

const fullTime=
now.toLocaleTimeString(
"en-US",
{
hour:"numeric",
minute:"2-digit"
}
);

const lines=

top.length

?

top.map(

(
x,
i
)=>

`${medals[i]} **${x.factionName}** ・ ${x.points} Points`

).join(
"\n\n"
)

:

"No factions yet";

const embed=
new EmbedBuilder()

.setColor(
"#22A8FF"
)

.setTitle(
"🏆 WAR LEADERBOARD 🏆"
)

.setDescription(

`\u200B

${lines}`

)

.setFooter({

text:

`Auto-updates every time points are updated

Last Updated: ${fullDate} at ${fullTime} | Today at ${fullTime}`

});

const channel=
await client.channels.fetch(
CHANNEL
);

const messages=
await channel.messages.fetch({

limit:20

});

const old=
messages.find(
m=>
m.author.id===
client.user.id
);

if(
old
){

await old.edit({

embeds:[
embed
]

});

}

else{

await channel.send({

embeds:[
embed
]

});

}

}

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
factionName:
faction.name,

$inc:{
points
}

},

{
upsert:true
}

);

await updateBoard(
interaction.client
);

return interaction.reply({

content:
`✅ Added ${points} points to ${faction}`,

ephemeral:true

});

}

};

module.exports.updateBoard=
updateBoard;
