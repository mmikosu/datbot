const { Client } = require("discord.js")
const client = new Client({
  autoReconnect: true
})

const config = require('./config.json')

const botver = "1.0.0"
const embedcolor = 517241

const randomPuppy = require('random-puppy')

//DBL API Server counter
const { stringify } = require('querystring')
const { request } = require('https')

const update = () => {
  const data = stringify({ server_count: client.guilds.size })
  const req = request({
    host: 'discordbots.org',
    path: `/api/bots/${client.user.id}/stats`,
    method: 'POST',
    headers: {
      'Authorization': 'long-dbl-token',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data)
    }
  })
  req.write(data)
  req.end()
}
//end of DBL API Server counter

client.on('ready', update);
client.on('guildCreate', update);
client.on('guildRemove', update);

client.on("ready", () => {
  console.log(`[Start] ${new Date()} | ${client.guilds.size} guilds`);
  client.user.setPresence({
    afk: false,
    status: "online",
    game: {
      name: "db.info",
      type: 3
    }
  })
})

client.on("guildCreate", guild => {
  client.user.setPresence({
    afk: false,
    status: "online",
    game: {
      name: "db.info",
      type: 3
    }
  })
});

client.on("guildDelete", guild => {
  client.user.setPresence({
    afk: false,
    status: "online",
    game: {
      name: "db.info",
      type: 3
    }
  })
})

client.on('message', async msg => {

  if(msg.author.bot) return

  if(msg.content.indexOf(config.prefix) !== 0) return

  const args = msg.content.slice(config.prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  if (command === 'ping') {
    const m = await msg.channel.send("Pinging...");
    m.edit(`Pong! Latency is ${m.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  if (command === 'info') {
	 msg.author.send({embed: {
   "title": "datbot ver " + botver,
   "description": "by Mikosu",
   "color": embedcolor,
   "footer": {
     "icon_url": client.user.avatarURL
   },
   "thumbnail": {
     "url": client.user.avatarURL
   },
   "author": {
     "name": "Info",
     "icon_url": client.user.avatarURL
   },
   "fields": [
     {
       "name": "Important Information",
       "value": "datbot is being retired. i dont find it to be a good bot anymore, and i dont want to rewrite the bot, as im working on a different one anyway."
     },
     {
       "name": "New Bot",
       "value": "a bot that could replace datbot: <https://discordapp.com/oauth2/authorize?client_id=499391082203840538&scope=bot&permissions=8>"
     }
    ]
  }})
  }

  if (command === 'help') {
	msg.channel.send("Type db.info");
  }

});

client.login(config.token);
