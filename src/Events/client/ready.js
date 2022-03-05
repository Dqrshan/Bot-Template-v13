const Event = require("../../Client/Event");

module.exports = new Event("ready", async (client) => {
	console.log(`[✨] ${client.user.username} online`);
	await client.initInteractions(client.guilds.cache.get(client.config.guild));
});
