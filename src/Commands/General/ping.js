const { EmbedBuilder } = require('discord.js')
const Command = require('../../Client/Command')

module.exports = new Command({
    name: 'ping',
    aliases: ['pong'],
    description: 'The ping of the bot',
    category: 'General',
    run: async (client, message, args) => {
        message
            .reply({
                embeds: [new EmbedBuilder().setDescription(`Pong!・\`${client.ws.ping}\` ms.`)],
            })
            .catch(() => {})
    },
    exec: async (client, interaction) => {
        interaction
            .reply({
                embeds: [new EmbedBuilder().setDescription(`Pong!・\`${client.ws.ping}\` ms.`)],
            })
            .catch(() => {})
    },
})
