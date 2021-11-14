
import discord from 'discord.js';
const { Client, Intents } = discord;
import { config } from "dotenv";
import { BarLakBot } from "./bot.js";

config()

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const token = process.env.DISCORD_TOKEN;
client.login(token)

const bots = {}


client.on("guildCreate", guild => {
    console.log("Bot Joined a guild: " + guild.name)
    bots[guild] = new BarLakBot(guild);
    guild.client.user.setStatus("online")

});

client.on("ready", () => {
    console.log("Bot Ready")
    client.guilds.fetch().then((guilds) => guilds.forEach((guild) =>{
        guild.fetch().then(guild => {
            bots[guild] = new BarLakBot(client, guild);
            client.user.setStatus("online")
        })
    }))
});

client.on('messageCreate', message => {
    bots[message.guild].routeMessage(message)       
});
