const Event = require("../../Client/Event");

module.exports = new Event("ready", async (client) => {
	console.log(`[✨] ${client.user.username} online`);
});
