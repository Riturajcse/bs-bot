const Discord = require("discord.js");
const mongoose = require('mongoose');
const config = require('config');
const searchService = require('./services/searchService');
const historyService = require('./services/historyService');

mongoose.connect('mongodb://localhost/bs-bot')
  .then(() => console.log('mongodb connected...'))
  .catch(err => console.error('Could not connect to MongoDB...'));



const client = new Discord.Client();
client.login(config.get('BOT_TOKEN'));

const prefix = "!";
client.on("message", async function(message) {
    if (message.author.bot) return;
    if (message.content === 'hi') {
        message.reply('hey');
    }
    if (!message.content.startsWith(prefix)) return;
  
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    if (command === "recent") {
        const searchText = args[0];
        const history = await historyService.searchHistory(searchText);
        if (history.length == 0) {
            message.reply(`No search history found for: ${searchText}`);
        } else {
            message.reply(history);
        }
    }  else if (command === "google") {
        const searchText = args[0];
        message.reply(`Fetching search results for ${searchText} ...`);
        const searchedLinks = await searchService.search(searchText);
        message.reply(searchedLinks);
        await historyService.create(searchText);
    } else {
        message.reply(`Invalid command: ${command}`);
    }
});
