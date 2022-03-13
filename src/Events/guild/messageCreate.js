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
	if (!command) return;

	try {
		if (command.permissions && Array.isArray(command.permissions)) {
			if (
				!message.member.permissions.has(command.permissions) &&
				!message.channel.permissionsFor(message.author.id).has(command.permissions)
			) {
				message.reply(
					`Missing \`${command.permissions.join(", ")}\` Permission`
				);
				return;
			}
		}
		/* Executing command */
		await command.run(client, message, args);
	} catch (error) {
		message.channel.send(`An error occurred: \`${error}\``);
		console.log(error);
	}
});
