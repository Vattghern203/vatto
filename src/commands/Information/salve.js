const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('salve')
        .setDescription('Manda um salve.'),
    async execute(interaction) {

        const user = interaction.getUser('target');

        if (user) {
            await interaction.reply(`Salve, ${user.username}!`)
        } else {
             await interaction.reply(`Salve, ${interaction.user.username}!`)
        }
    }
}