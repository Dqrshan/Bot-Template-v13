const Command = require("../../Client/Command"),
	{ MessageEmbed } = require("discord.js");
module.exports = new Command({
	name: "ping",
	aliases: ["pong"],
	description: "The ping of the bot",
	category: "General",

	run: async (client, message, args) => {
		await message.reply("🏓 Pinging..").then(async (msg) => {
			const ping = msg.createdTimestamp - message.createdTimestamp;
			const embed = new MessageEmbed()
				.addField(`Websocket:`, `\`${client.ws.ping}\``, true)
				.addField("Discord:", `\`${ping}\``, true)
				.setColor("BLURPLE");
			msg.edit({ embeds: [embed], content: "**🏓 Pong!**" });
		});
	},
});
