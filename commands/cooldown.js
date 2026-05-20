const Cooldown =
require(
"../models/Cooldown"
);

const OWNER =
"1493444225684209664";

const LEADER =
"1478598978718273627";

module.exports={

async execute(
interaction
){

if(

!interaction.member.roles.cache.has(
OWNER
)

&&

!interaction.member.roles.cache.has(
LEADER
)

){

return interaction.reply({

content:
"❌ Faction owners/leaders only.",

ephemeral:true

});

}

const faction =
interaction.options.getRole(
"faction"
);

const cooldown =
await Cooldown.findOne({

factionId:
faction.id

});

if(

!cooldown ||

cooldown.endsAt <
new Date()

){

return interaction.reply({

content:

`✅ ${faction}

No active cooldown.`

});

}

const seconds =
Math.ceil(
(
cooldown.endsAt-
Date.now()
)
/1000
);

const minutes =
Math.floor(
seconds/60
);

const remain =
seconds%60;

interaction.reply({

content:

`⏳ **ACTIVE WAR COOLDOWN**

Faction:
${faction}

Remaining:
**${minutes}m ${remain}s**`

});

}

};