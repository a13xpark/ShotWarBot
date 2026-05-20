const Cooldown =
require("../models/Cooldown");

const log =
require("./log");

const STAFF =
"1493440601973194903";

const COOLDOWNS =
"1506461891529015336";

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
"❌ Faction staff only.",

ephemeral:true

});

}

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
x=>
x.endsAt >
new Date()
)

){

return interaction.reply({

content:
"⛔ This faction already has cooldown.",

ephemeral:true

});

}

const end=
Date.now()
+
300000;

await Cooldown.updateMany(

{

factionId:{
$in:[
faction1.id,
faction2.id
]

}

},

{

endsAt:
new Date(
end
)

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
"/setcooldown",

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
COOLDOWNS
);

const msg=
await channel.send({

content:
"starting..."

});

const timer=
setInterval(

async()=>{

const left=
Math.max(
0,
Math.floor(
(
end-
Date.now()
)
/1000
)
);

const m=
Math.floor(
left/60
);

const s=
left%60;

await msg.edit({

content:

`⏳ **WAR COOLDOWN**

${faction1}

VS

${faction2}

${m}m ${s}s`

});

if(
left<=0
){

clearInterval(
timer
);

await msg.edit({

content:

`✅ **COOLDOWN ENDED**

${faction1}

VS

${faction2}`

});

}

},

1000

);

return interaction.reply({

content:
"✅ Cooldown started.",

ephemeral:true

});

}

};