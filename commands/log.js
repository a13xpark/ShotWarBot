module.exports = async (
client,
data
)=>{

const LOGS =
"1506473417442857040";

try{

const channel =
await client.channels.fetch(
LOGS
);

if(
!channel
)
return;

const actions={

"/war":
"⚔️ War Started",

"/endwar":
"🏳️ War Ended",

"/setcooldown":
"⏳ Cooldown Applied",

"/cooldown":
"🕒 Cooldown Checked"

};

await channel.send({

content:

`👤 User
<@${data.user}>

⚙️ Command
${actions[
data.command
] || data.command}

🏴 Faction 1
${data.f1 || "N/A"}

🏳️ Faction 2
${data.f2 || "N/A"}

🕒 Time
<t:${Math.floor(
Date.now()/1000
)}:F>`

});

}

catch(
err
){

console.log(
err
);

}

};