const {
    REST
} = require('@discordjs/rest');

const {
    Routes
} = require('discord-api-types/v9');

const fs = require('fs');
const clientId = '971104788995514399';
const guildId = '766808076992774184';

module.exports = (client) => {
    client.handleCommands = async (commandFolders, path) => {
        client.commadArray = [];

        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);

                client.commands.set(command.data.name, command);
                client.commadArray.push(command.data.toJSON());
            }
            
        }

        const rest = new REST({
            version: '9'
        }).setToken(process.env.token);

        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');

                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId), {
                        body: client.commadArray
                    },
                );

                console.log('Sucessfully reloaded application (/) commands.');

            } catch (error) {
                console.error(error);
            }
        })();
    };
};