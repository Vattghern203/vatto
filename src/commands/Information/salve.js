const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('salve')
        .setDescription('Manda um salve.'),
    async execute(interaction) {
        await interaction.reply('Salve')
    }
}