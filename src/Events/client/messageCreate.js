const Event = require("../../Client/Event");

module.exports = new Event("messageCreate", async (client, message) => {
	if (message.author.bot || !message.guild) return;

	if (!message.content.startsWith(client.config.prefix)) return;
	const args = message.content
		.slice(client.config.prefix.length)
		.trim()
		.split(/ +/g);
	const cmd = args.shift().toLowerCase();

	const command =
		client.commands.get(cmd) ||
		client.commands.find((c) => c.aliases && c.aliases.includes(cmd));
	if (!command) return message.reply(`\`${cmd}\` is not a valid command!`);

	try {
		if (command.permissions && Array.isArray(command.permissions)) {
			command.permissions.forEach((perm) => {
				if (
					!message.member.permissions.has(perm) ||
					!message.channel.permissionsFor(message.author.id).has(perm)
				) {
					message.reply(`Missing \`${perm}\` Permission`);
					return;
				}
			});
		}
		/* Executing command */
		await command.execute(client, message, args);
	} catch (error) {
		message.channel.send(`An error occurred: \`${error}\``);
		console.log(error);
	}
});
