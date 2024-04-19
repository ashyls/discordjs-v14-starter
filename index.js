const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const { connect } = require('mongoose');

require("dotenv").config();
const token = process.env.TOKEN;
const databaseToken = process.env.DBTOKEN;

const client = new Client({ intents: GatewayIntentBits.Guilds });
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync('./src/functions');
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (const file of functionFiles)
        require(`./src/functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);

/* Database Connection 
    change branch to see how mongodb database works with mongoose
*/
