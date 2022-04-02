const Event = require('../../Client/Event')

module.exports = new Event('interactionCreate', async (client, interaction) => {
    if (interaction.isCommand()) {
        const command = client.interactions.get(interaction.commandName)
        if (!command) return

        if (command) {
            if (command.permissions && Array.isArray(command.permissions)) {
                if (
                    !interaction.member.permissions.has(command.permissions) &&
                    !interaction.channel.permissionsFor(interaction.member.id).has(command.permissions)
                ) {
                    interaction
                        .reply({
                            content: `Missing \`${command.permissions.join(', ')}\` Permission(s)`,
                            ephemeral: true,
                        })
                        .catch(() => {})
                    return
                }
            }

            try {
                await command.exec(client, interaction)
            } catch (error) {
                interaction.reply({
                    content: `An error occurred: \`${error}\``,
                })
                console.log(error)
            }
        }
    }
})
