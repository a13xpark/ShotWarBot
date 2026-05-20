require("dotenv").config();

const mongoose =
require("mongoose");

const {
Client,
GatewayIntentBits
} =
require("discord.js");

const war =
require("./commands/war");

const endwar =
require("./commands/endwar");

const cooldown =
require("./commands/cooldown");

const setcooldown =
require("./commands/setcooldown");

const addpoints =
require("./commands/addpoints");

const removepoints =
require("./commands/removewarpoints");

const points =
require("./commands/points");

const reset =
require("./commands/resetleaderboard");

const history =
require("./commands/warhistory");

const client =
new Client({

intents:[
GatewayIntentBits.Guilds
]

});

client.once(

"clientReady",

async()=>{

console.log(
`✅ Logged in as ${client.user.tag}`
);

await client.application.commands.set([

{

name:"war",

description:
"Start war",

options:[

{

name:"faction1",

description:
"Faction 1",

type:8,

required:true

},

{

name:"faction2",

description:
"Faction 2",

type:8,

required:true

}

]

},

{

name:"endwar",

description:
"End war and save results",

options:[

{

name:"winner",

description:
"Winning faction",

type:8,

required:true

},

{

name:"loser",

description:
"Losing faction",

type:8,

required:true

}

]

},

{

name:"setcooldown",

description:
"Apply cooldown",

options:[

{

name:"faction1",

description:
"Faction 1",

type:8,

required:true

},

{

name:"faction2",

description:
"Faction 2",

type:8,

required:true

}

]

},

{

name:"cooldown",

description:
"Check cooldown",

options:[

{

name:"faction",

description:
"Faction",

type:8,

required:true

}

]

},

{

name:"warpoints",

description:
"Add faction points",

options:[

{

name:"faction",

description:
"Faction",

type:8,

required:true

},

{

name:"points",

description:
"Points",

type:4,

required:true

}

]

},

{

name:"removewarpoints",

description:
"Remove faction points",

options:[

{

name:"faction",

description:
"Faction",

type:8,

required:true

},

{

name:"points",

description:
"Points",

type:4,

required:true

}

]

},

{

name:"factionpoints",

description:
"Check faction points",

options:[

{

name:"faction",

description:
"Faction",

type:8,

required:true

}

]

},

{

name:"warhistory",

description:
"View all-time faction history",

options:[

{

name:"faction",

description:
"Faction",

type:8,

required:true

}

]

},

{

name:"resetwarpoints",

description:
"Reset monthly leaderboard"

}

]);

console.log(
"✅ Commands Registered"
);

}

);

client.on(

"interactionCreate",

async interaction=>{

if(
!interaction.isChatInputCommand()
)
return;

const commands={

war,

endwar,

cooldown,

setcooldown,

warpoints:
addpoints,

removewarpoints:
removepoints,

factionpoints:
points,

warhistory:
history,

resetwarpoints:
reset

};

const command=

commands[
interaction.commandName
];

if(
command
){

await command.execute(
interaction
);

}

}

);

mongoose.connect(
process.env.MONGO_URI
)

.then(

()=>console.log(
"✅ Mongo Connected"
)

)

.catch(
console.error
);

client.login(
process.env.TOKEN);