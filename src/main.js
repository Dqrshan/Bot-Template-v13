require("dotenv").config();
const Client = require("./Client/Bot"),
	client = new Client();

client.start(client.config.token);
