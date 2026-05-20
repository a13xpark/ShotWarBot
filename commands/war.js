const Cooldown =
require("../models/Cooldown");

const log =
require("./log");

const LIVE_WARS =
"1506461477354209393";

module.exports={

async execute(
interaction
){

const faction1=
interaction.options.getRole(
"faction1"
);

const faction2=
interaction.options.getRole(
"faction2"
);

const existing=
await Cooldown.find({

factionId:{
$in:[
faction1.id,
faction2.id
]
}

});

if(
existing.some(
x=>x.inWar
)
){

return interaction.reply({

content:
"⛔ This faction is already in a war.",

ephemeral:true

});

}

await Cooldown.findOneAndUpdate(

{
factionId:
faction1.id
},

{
inWar:true
},

{
upsert:true
}

);

await Cooldown.findOneAndUpdate(

{
factionId:
faction2.id
},

{
inWar:true
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
"/war",

f1:
faction1,

f2:
faction2,

channel:
interaction.channelId

}

);

const channel=
await interaction.client.channels.fetch(
LIVE_WARS
);

await channel.send({

content:

`${faction1}

VS

${faction2}

⚔️ **WAR STARTED** ⚔️`

});

return interaction.reply({

content:
"✅ War announced.",

ephemeral:true

});

}

};