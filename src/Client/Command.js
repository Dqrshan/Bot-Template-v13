const Discord = require("discord.js"),
	Bot = require("./Bot");
/**
 * @param {Bot} client
 * @param {Discord.Message} message
 * @param {String[]} args
 */
function RunFunction(client, message, args) {}
class Command {
	/**
	 * @typedef {{
	 *      name: string,
	 *      description:string,
	 *      category: string,
	 *      aliases: array,
	 *      permissions: array,
	 *      usage: string,
	 *      run: RunFunction}} CommandOptions
	 * @param {CommandOptions} options
	 */
	constructor(options) {
		this.name = options.name;
		this.description = options.description;
		this.category = options.category;
		this.aliases = options.aliases;
		this.permissions = options.permissions;
		this.usage = options.usage;

		this.run = options.run;
	}
}

module.exports = Command;
