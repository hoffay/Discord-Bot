console.log("Loaded misc.js");
exports.commands = [
    "vote",
    "discord",
    "invite",
    "suggest",
    "info",
    "serverinfo"
];
exports.vote = {
    category: "misc",
    usage: "Vote for bungus to get music",
    process: function (bot, msg) {
            msg.channel.send("Vote every 12 hours at https://discordbots.org/bot/185124264091844608/vote");
    }
};

exports.discord = {
    category: "misc",
    usage: "Official Bungus Chungus discord",
        process: function (bot, msg) {
            msg.channel.send("click this link to join the official Bungus Chungus discord ***");
        }
};

exports.invite = {
    category: "misc",
    usage: "Invite link for this discord bot",
        process: function (bot, msg) {
            bot.generateInvite(['ADMINISTRATOR']).then(link => msg.channel.send(`Click this link for the bot to join your server\n ${link}`));
        }
};

exports.suggest = {
    category: "misc",
    usage: "Sends your suggestion to the creator of the bot",
        process: function (bot, msg, suffix) {            
                bot.channels.cache.get("432948709404442624").send(msg.author + " said " + suffix);
                msg.channel.send("Suggestion sent");
        }
};

exports.info = {
    category: "misc",
    usage: "Info about the bot",
        process: function (bot, msg) {
                let dbot = require("./discord_bot.js");
                var embed = new Discord.RichEmbed()
                    .setTitle("Info")
                    .addField("Commands:", dbot.commandCount())
                    .addField("Servers:", bot.guilds.cache.size)
                    .addField("Channels:", bot.channels.array().length)
                    .addField("Users:", bot.users.array().length)
                    .addField("Ram usage:", process.memoryUsage().heapUsed / 1024 / 1024 + "MB")
                    .setFooter("!help for more info")
                    .setTimestamp();
                msg.channel.send({
                    embed
                });
        }
};

exports.serverinfo = {
    category: "misc",
    usage: "Info about the server",
        process: function (bot, msg) {
                if (msg.guild) {
                    var embed = new Discord.RichEmbed()
                        .setTitle(msg.guild.name + " info")
                        .setThumbnail(msg.guild.iconURL())
                        .addField("Owner:", msg.guild.owner)
                        .addField("Users:", msg.guild.memberCount)
                        .addField("Channels:", msg.guild.channels.array().length)
                        .addField("Region:", msg.guild.region)
                        .addField("Created at:", msg.guild.createdAt)
                        //.addField("Emojis:", msg.guild.emojis.array())
                        .setTimestamp();
                    msg.channel.send({
                        embed
                    });
                } else {
                    msg.reply("This command can only be used in a server");
                }
        }
};
