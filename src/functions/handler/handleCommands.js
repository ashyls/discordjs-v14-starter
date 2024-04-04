const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const token = process.env.TOKEN;
const clientId = process.env.CLIENTID;
const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs
            .readdirSync('./src/commands');
        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter(file => file.endsWith('.js'));
            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
            }
        }

        // Construct and prepare an instance of the REST module
        const rest = new REST({ version: '9' }).setToken(token);

        // and deploy your commands!
        try {
            console.log(`Started refreshing application (/) commands.`);
            
            // The put method is used to fully refresh all commands in the guild with the current set
            await rest.put(
                Routes.applicationCommands(clientId),
                { body: client.commandArray },
            );
            console.log(`Successfully reloaded application (/) commands.`);
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
        };
    };
};