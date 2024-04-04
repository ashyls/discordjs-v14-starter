const { time } = require("discord.js");


module.exports = {
    name: 'interactionCreate',
    cooldown: 5,
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: 'Something went wrong while executing this command ',
                    ephemeral: true
                })
            }
        } else if (interaction.isButton()) {
            const { buttons } = client;
            const { customId } = interaction;
            const button = buttons.get(customId);
            if (!button) return new Error('Theres no code for button');

            try {
                await button.execute(interaction, client);

            } catch (error) {
                console.log(error);
            }
        } else if (interaction.isStringSelectMenu()) {
            const { selectMenus } = client;
            const { customId } = interaction;
            const menu = selectMenus.get(customId);
            if (!menu) return new Error("There is no Select Menu code");

            try {
                await menu.execute(interaction, client);
            } catch (error) {
                console.log(error);
            }
        }
    }
}