const Discord = require("discord.js"),
	fs = require("fs"),
	config = require("../config"),
	Event = require("./Event");

class Bot extends Discord.Client {
	constructor() {
		super({ intents: 32767 });

		this.commands = new Discord.Collection();
		this.interactions = new Discord.Collection();
		this.aliases = new Discord.Collection();
		this.config = config;
	}
	start(token) {
		if (!token) return console.error(`[ERROR]: Invalid/No Token Provided`);
		this.initCommands();
		this.initEvents();
		this.login(token);
	}
	d;

	initCommands() {
		let counter = 0;
		const subFolder = fs.readdirSync("./src/commands");
		for (const category of subFolder) {
			const commandsFiles = fs.readdirSync(`./src/commands/${category}`);
			for (const commandFile of commandsFiles) {
				const command = require(`../commands/${category}/${commandFile}`);

				if (command.run && typeof command.run === "function") {
					this.commands.set(command.name, command);
				}
				counter++;
			}
		}
		console.log(`[commands]: ${counter}`);
	}

	initEvents() {
		let counter = 0;
		const subFolder = fs.readdirSync("./src/events");
		for (const category of subFolder) {
			const eventsFiles = fs
				.readdirSync(`./src/events/${category}`)
				.filter((f) => f.endsWith(".js"));
			for (const eventFile of eventsFiles) {
				const event = require(`../events/${category}/${eventFile}`);
				/**
				 * @type {Event}
				 */
				this.on(event.event, event.run.bind(null, this));

				counter++;
			}
		}
		console.log(`[events]: ${counter}`);
	}

	async initInteractions() {
		let counter = 0;
		const subFolder = fs.readdirSync("./src/commands");
		for (const category of subFolder) {
			const commandsFiles = fs.readdirSync(`./src/commands/${category}`);
			for (const commandFile of commandsFiles) {
				const command = require(`../commands/${category}/${commandFile}`);

				if (command.exec && typeof command.exec === "function") {
					this.interactions.set(command.name, command);
				}
				counter++;
			}
		}
		console.log(`[commands]: ${counter}`);
	}

	async register(guild) {
		const commands = this.interactions.map((cmd) => this.build(cmd));
		if (guild) {
			this.application?.commands
				.set(
					commands,
					guild instanceof Discord.Guild
						? guild.id
						: guild instanceof String
						? guild
						: null
				)
				.catch((e) => console.error(e));
		} else {
			this.application?.commands.set(commands).catch((e) => console.error(e));
		}
	}

	async build(command) {
		return {
			name: command.name,
			description: command.description,
			options: command.slashOptions,
		};
	}
}

module.exports = Bot;
