const Cooldown=
require(
"../models/Cooldown"
);

const History=
require(
"../models/WarHistory"
);

const log=
require(
"./log"
);

const STAFF=
"1493440601973194903";

const LIVE=
"1506461477354209393";

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
"❌ Staff only",

ephemeral:true

});

}

const winner=
interaction.options.getRole(
"winner"
);

const loser=
interaction.options.getRole(
"loser"
);

await Cooldown.updateMany(

{

factionId:{
$in:[
winner.id,
loser.id
]
}

},

{

inWar:false

}

);

await History.findOneAndUpdate(

{

factionId:
winner.id

},

{

factionName:
winner.name,

$inc:{

wins:1,

wars:1

}

},

{

upsert:true

}

);

await History.findOneAndUpdate(

{

factionId:
loser.id

},

{

factionName:
loser.name,

$inc:{

losses:1,

wars:1

}

},

{

upsert:true

}

);

await log(

interaction.client,

{

user:
interaction.user.id,

command:
"/endwar",

f1:
winner,

f2:
loser

}

);

const channel=
await interaction.client.channels.fetch(
LIVE
);

await channel.send({

content:

`${winner}

VS

${loser}

🏳️ WAR ENDED 🏳️`

});

interaction.reply({

content:
"✅ War saved.",

ephemeral:true

});

}

};