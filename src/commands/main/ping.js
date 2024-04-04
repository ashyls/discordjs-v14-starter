const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('ping command'),
        
    async execute(interaction, client){
        await interaction.reply('Pong !!')

        // Embed Example ( uncomment to use )
        // const helpEmbed = new EmbedBuilder()
        //     .setTitle('Pong')
        //     .setDescription('ping replied !!')
        //     .setColor('Blue')

        // await interaction.reply({ embeds: [helpEmbed] });
    }
}