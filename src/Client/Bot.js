const Discord = require('discord.js'),
    fs = require('fs'),
    config = require('../config'),
    Event = require('./Event'),
    { REST } = require('@discordjs/rest'),
    { Routes } = require('discord-api-types/v9')

class Bot extends Discord.Client {
    constructor() {
        super({ intents: 32767 })

        this.commands = new Discord.Collection()
        this.interactions = new Discord.Collection()
        this.config = config
    }
    start(token) {
        if (!token) return console.error(`[ERROR]: Invalid/No Token Provided`)
        this.initCommands()
        // this.initInteractions(); // Moved to `ready.js`
        this.initEvents()
        this.login(token)
    }

    initCommands() {
        let counter = 0
        const subFolder = fs.readdirSync('./src/commands')
        for (const category of subFolder) {
            const commandsFiles = fs.readdirSync(`./src/commands/${category}`)
            for (const commandFile of commandsFiles) {
                const command = require(`../commands/${category}/${commandFile}`)

                if (command.run && typeof command.run === 'function') {
                    this.commands.set(command.name, command)
                }
                counter++
            }
        }
        console.log(`[commands]: ${counter}`)
    }

    initEvents() {
        let counter = 0
        const subFolder = fs.readdirSync('./src/events')
        for (const category of subFolder) {
            const eventsFiles = fs.readdirSync(`./src/events/${category}`).filter(f => f.endsWith('.js'))
            for (const eventFile of eventsFiles) {
                const event = require(`../events/${category}/${eventFile}`)
                /**
                 * @type {Event}
                 */
                this.on(event.event, event.run.bind(null, this))

                counter++
            }
        }
        console.log(`[events]: ${counter}`)
    }

    async initInteractions(guild) {
        let counter = 0
        let commands = []
        const subFolder = fs.readdirSync('./src/commands')
        for (const category of subFolder) {
            const commandsFiles = fs.readdirSync(`./src/commands/${category}`)
            for (const commandFile of commandsFiles) {
                const command = require(`../commands/${category}/${commandFile}`)

                if (command.exec) {
                    this.interactions.set(command.name, command)
                    commands.push(this.build(command))
                }
                counter++
            }
        }
        console.log(`[interactions]: ${counter}`)
        const rest = new REST({ version: '9' }).setToken(process.env.token)

        try {
            console.log('Started refreshing application (/) commands.')

            await rest.put(Routes.applicationGuildCommands(this.user.id, guild.id), {
                body: commands,
            })

            console.log('Successfully reloaded application (/) commands.')
        } catch (error) {
            console.error(error)
        }
    }

    build(command) {
        return {
            name: command.name,
            description: command.description,
            defaultPermissions: true,
            options: command.slashOptions ?? [],
        }
    }
}

module.exports = Bot
