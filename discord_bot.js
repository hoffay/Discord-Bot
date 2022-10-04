try {
    var Discord = require("discord.js");
} catch (e) {
    console.log(e.stack);
    console.log(process.version);
    process.exit();
}
console.log("Starting DiscordBot\nNode version: " + process.version + "\nDiscord.js version: " + Discord.version);
var bot = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL(DBL_API, bot);
require('events').EventEmitter.prototype._maxListeners = 100;
require('events').EventEmitter.defaultMaxListeners = 25;
var math = require('mathjs');
try {
    var AuthDetails = require("./auth.json");
} catch (e) {
    process.exit();
}
var Permissions = {};
try {
    Permissions = require("./permissions.json");
} catch (e) {
    Permissions.global = {};
    Permissions.users = {};
}

var Config = {};
try {
    Config = require("./config.json");
} catch (e) {
    Config.debug = false;
    Config.commandPrefix = "!";
    try {

    } catch (e2) {

    }
}
if (!Config.hasOwnProperty("commandPrefix")) {
    Config.commandPrefix = "!";
}

Permissions.checkPermission = function (user, permission) {
    try {
        var allowed = true;
        try {
            if (Permissions.global.hasOwnProperty(permission)) {
                allowed = Permissions.global[permission] === true;
            }
        } catch (e) { }
        try {
            if (Permissions.users[user.id].hasOwnProperty(permission)) {
                allowed = Permissions.users[user.id][permission] === true;
            }
        } catch (e) { }
        return allowed;
    } catch (e) { }
    return false;
};





try {
    var commands = {
        "8ball": {
            usage: "Try your luck",
            category: "utility",
            process: function (bot, msg) {
                if (Permissions.checkPermission(msg.author, "everyone")) {
                    var yn = [
                        "Yes",
                        "No"
                    ];
                    msg.channel.send(yn[Math.floor(Math.random() * yn.length)]);
                } else {
                    msg.channel.send(msg.author + " doesn't have permission to use this command!");
                }
            }
        },





        "meme": {
            usage: "Meme commands !memehelp for more info",
            process: function (bot, msg, suffix) {
                if (Permissions.checkPermission(msg.author, "everyone")) {
                    if (msg.content.length === 5) {
                        msg.channel.send("Do !memehelp for options");
                    }
                   
                } else {
                    msg.channel.send(msg.author + " doesn't have permission to use this command!");
                }
            }
        },









        /*"tell": {
    	process: function (bot, msg) {
    		var str = msg.content.split(" ");
    		str.splice(0, 2);
    		var message = str.join(" ");
			bot.users.get(msg.content.split(" ")[1].send(message);
			bot.channels.cache.get("221245017262391296").send("Message sent to "+msg.content.split(" ")[1]);
    	}
    },
*/





        //offsite:
        "play": {
            category: "music",
            usage: "Plays the song that you pick",
            process: function (bot, msg) {

            }
        },
        "skip": {
            category: "music",
            usage: "Skips the current song",
            process: function (bot, msg) {

            }
        },
        "queue": {
            category: "music",
            usage: "Shows the queue",
            process: function (bot, msg) {

            }
        },
        "stop": {
            category: "music",
            usage: "Ends the queue",
            process: function (bot, msg) {

            }
        },
        "volume": {
            category: "music",
            usage: "Change the volume of the bot",
            process: function (bot, msg) {

            }
        },





        "help": {
            usage: "Help Commands",
            process: function (bot, msg) {
                var embed = new Discord.MessageEmbed()
                    .setTitle("Help Commands")
                    .addField(":musical_note: Music:", "**!musichelp**", true)
                    .addField(":frame_photo: Images:", "**!imagehelp**", true)
                    .addField(":hammer: Moderation:", "**!adminhelp**", true)
                    .addField(":tools: Utility:", "**!utilityhelp**", true)
                    .addField(":rofl: Memes:", "**!memehelp**", true)
                    .addField(":shopping_cart: Misc:", "**!mischelp**", true)
                    .addField(":information_source: Info:", "**!info**", true)
                    .addField("Official bot Discord: ***", "Bot made by <@105747712481173504>")
                    .setFooter("!helpall for all commands")
                    .setTimestamp();
                msg.channel.send({
                    embed
                });
            }
        },

        "musichelp": {
            category: "music",
            usage: "The music commands",
            process: function (bot, msg) {
                var cmdcheck = Object.keys(commands);
                var cata = "";
                for (i = 0; i < cmdcheck.length; i++) {
                    var cmd1 = cmdcheck[i];
                    var category = commands[cmd1].category;
                    var usage = commands[cmd1].usage;
                    if (category === "music") {
                        cata += "**!" + cmdcheck[i] + "** " + usage + "\n";
                    }
                }
                msg.channel.send("**Music Commands**\n" + cata);
            }
        },

        "imagehelp": {
            category: "image",
            usage: "The image commands",
            process: function (bot, msg) {
                var cmdcheck = Object.keys(commands);
                var cata = "";
                for (i = 0; i < cmdcheck.length; i++) {
                    var cmd1 = cmdcheck[i];
                    var category = commands[cmd1].category;
                    var usage = commands[cmd1].usage;
                    if (category === "image") {
                        cata += "**!" + cmdcheck[i] + "** " + usage + "\n";
                    }
                }
                msg.channel.send("**Image Commands**\n" + cata);
            }
        },


        "utilityhelp": {
            category: "ultility",
            usage: "The utility commands",
            process: function (bot, msg) {
                var cmdcheck = Object.keys(commands);
                var cata = "";
                for (i = 0; i < cmdcheck.length; i++) {
                    var cmd1 = cmdcheck[i];
                    var category = commands[cmd1].category;
                    var usage = commands[cmd1].usage;
                    if (category === "utility") {
                        cata += "**!" + cmdcheck[i] + "** " + usage + "\n";
                    }
                }
                msg.channel.send("**Utility Commands**\n" + cata);
            }
        },

        "memehelp": {
            category: "meme",
            usage: "The !meme commands",
            process: function (bot, msg) {
                var cmdcheck = Object.keys(commands);
                var cata = "";
                for (i = 0; i < cmdcheck.length; i++) {
                    var cmd1 = cmdcheck[i];
                    var category = commands[cmd1].category;
                    var usage = commands[cmd1].usage;
                    if (category === "meme") {
                        cata += "**!" + cmdcheck[i] + "** " + usage + "\n";
                    }
                }
                msg.channel.send("**Meme Commands**\n" + cata);
            }
        },

        "mischelp": {
            category: "misc",
            usage: "The misc commands",
            process: function (bot, msg) {
                var cmdcheck = Object.keys(commands);
                var cata = "";
                for (i = 0; i < cmdcheck.length; i++) {
                    var cmd1 = cmdcheck[i];
                    var category = commands[cmd1].category;
                    var usage = commands[cmd1].usage;
                    if (category === "misc") {
                        cata += "**!" + cmdcheck[i] + "** " + usage + "\n";
                    }
                }
                msg.channel.send("**Misc Commands**\n" + cata);
            }
        },





        //end of commands
    };
} catch (error) {
}



bot.on("ready", function () {

    console.log("On, currently in " + bot.guilds.cache.size + " in servers");
    require("./plugins.js").init();
    bot.user.setPresence({ activity: { name: bot.guilds.cache.size + " servers | !help | !invite" }, status: 'online' });
});
/*bot.on('guildMemberAdd', member => {
  var channel = member.guild.a.find('name', 'member-log');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
});
*/
bot.on("disconnected", function () {

    console.log("Disconnected!");
    process.exit(1);

});

bot.on('reconnecting', () => console.log('Successfully reconnected.'));

function checkMessageForCommand(msg, isEdit, channels) {
    try {
        if (msg.author.id !== bot.user.id && msg.content.startsWith("!")) {
            if (msg.guild) {
                if (msg.author.bot === false) {
                    if (msg.guild.id !== "2644450535969914928") {
                        if (msg.guild.id !== "110373943822540800") {
                            if (msg.channel.permissionsFor(msg.guild.me).has("SEND_MESSAGES")) {
                                console.log(msg.author.username + ": did " + msg.content + " in: " + "Guild: " + msg.guild.name + " id: " + msg.guild.id + "** userid: **" + msg.author.id + "**");
                                bot.channels.cache.get("364881535117295618").send("|" + msg.author.username + ": did " + msg.content + " in: " + "Guild: **" + msg.guild.name + "** id: **" + msg.guild.id + "** userid: **" + msg.author.id + "**");
                            }
                        }
                    }
                }
            }
            var cmdTxt = msg.content.split(" ")[0].substring(Config.commandPrefix.length);
            var suffix = msg.content.substring(cmdTxt.length + Config.commandPrefix.length + 1);
            if (msg.mentions.has(bot.user)) {
                try {
                    cmdTxt = msg.content.split(" ")[1];
                    suffix = msg.content.substring(bot.user.mention().length + cmdTxt.length + Config.commandPrefix.length + 1);
                } catch (e) { //no command

                    return;
                }
            }

            var cmd = commands[cmdTxt];
            if (cmdTxt === "helpall") {
                if (suffix) {
                    var cmds = suffix.split(" ").filter(function (cmd) {
                        return commands[cmd];
                    });
                    var info = "";
                    for (var i = 0; i < cmds.length; i++) {
                        var cmd = cmds[i];
                        info += "**" + Config.commandPrefix + cmd + "**";
                        var usage = commands[cmd].usage;
                        if (usage) {
                            info += " " + usage;
                        }
                        var description = commands[cmd].description;
                        if (description instanceof Function) {
                            description = description();
                        }
                        if (description) {
                            info += "\n\t" + description;
                        }
                        info += "\n";
                    }
                    msg.channel.send(info);
                } else {
                    msg.author.send("**Commands:**\n For more help join the bot discord ***").then(function () {
                        var batch = "";
                        var sortedCommands = Object.keys(commands).sort();
                        for (var i in sortedCommands) {
                            var cmd = sortedCommands[i];
                            var info = "**" + Config.commandPrefix + cmd + "**";
                            var usage = commands[cmd].usage;
                            if (usage) {
                                info += " " + usage;
                            }
                            var description = commands[cmd].description;
                            if (description instanceof Function) {
                                description = description();
                            }
                            if (description) {
                                info += "\n\t" + description;
                            }
                            var newBatch = batch + "\n" + info;
                            if (newBatch.length > 1024 - 8) {
                                msg.author.send(batch);
                                batch = info;
                            } else {
                                batch = newBatch;
                            }
                        }
                        if (batch.length > 0) {
                            msg.author.send(batch);
                        }
                    });
                }
            } else if (cmd) {
                if (Permissions.checkPermission(msg.author, cmdTxt)) {
                    try {
                        if (msg.guild) {
                            if (msg.channel.permissionsFor(msg.guild.me).has("SEND_MESSAGES")) {
                                cmd.process(bot, msg, suffix, isEdit).catch(error);
                            }
                        } else {
                            cmd.process(bot, msg, suffix, isEdit).catch(error);
                        }
                    } catch (e) {

                    }
                } else {
                    console.log("rip");

                }
            } else {

            }

        } else {

            if (msg.author === bot.user) {
                return;
            }

            if (msg.author !== bot.user && msg.mentions.has(bot.user)) {
                //bot responding to @
            }

        }
    } catch (error) {
    }

}




          

bot.on("message", function (msg) {
    if (msg.author.bot === false) {
        if (msg.guild === true) {
            if (Math.random() > 0.95) {
                var dad = msg.content.replace(/.*i'm/g, "");
                var dad1 = msg.content.replace(/.*I'm/g, "");
                var dad2 = msg.content.replace(/.*i‘m/g, "");
                var dad3 = msg.content.replace(/.*I‘m/g, "");
                var dad4 = msg.content.replace(/.*im /g, " ");
                var dad5 = msg.content.replace(/.*Im /g, " ");
                if (msg.content.startsWith("i'm")) {
                    msg.channel.send("Hi" + dad + ", i'm dad");
                } else if (msg.content.startsWith("I'm ")) {
                    msg.channel.send("Hi" + dad1 + ", i'm dad");
                } else if (msg.content.startsWith("i'm ")) {
                    msg.channel.send("Hi" + dad2 + ", i'm dad");
                } else if (msg.content.startsWith("I'm ")) {
                    msg.channel.send("Hi" + dad3 + ", i'm dad");
                } else if (msg.content.startsWith("im ")) {
                    msg.channel.send("Hi" + dad4 + ", i'm dad");
                } else if (msg.content.startsWith("Im ")) {
                    msg.channel.send("Hi" + dad5 + ", i'm dad");
                }
                //}
            }
        }
    }
});





bot.on("message", function (msg) {
    try {
        if (msg.content.toLowerCase().startsWith("whats ")) {
            var evalthemath = msg.content.substr(6);
            msg.channel.send(math.eval(evalthemath)).catch(console.error);
        }
    } catch (error) {
    }
});





bot.on("guildCreate", function (guild) {
    console.log("Joined: " + guild.name + " id: " + guild.id);
    //guild.channels.filter(chan => chan.type == 'text' && chan.guild.me.permissions.hasPermission(Discord.Permissions.FLAGS.SEND_MESSAGES)).first().send("**Thanks for adding bot use !help for more info!**").then().catch(console.error);
    bot.channels.cache.get("433748188315254802").send("Joined: " + guild.name + " id: " + guild.id);
    const general = guild.channels.cache.find(ch => ch.name === 'general');

    if (general === true) {
        general.send("**Thanks for adding the bot use *!help* for a list of the commands** \n").catch(error);

        var embed = new Discord.MessageEmbed()
            .setTitle("Help Commands")
            .addField(":musical_note: Music:", "**!musichelp**", true)
            .addField(":frame_photo: Images:", "**!imagehelp**", true)
            .addField(":hammer: Moderation:", "**!adminhelp**", true)
            .addField(":tools: Utility:", "**!utilityhelp**", true)
            .addField(":rofl: Memes:", "**!memehelp**", true)
            .addField(":shopping_cart: Misc:", "**!mischelp**", true)
            .addField(":information_source: Info:", "**!info**", true)
            .addField("Official bot Discord: ***", "Bot made by <@105747712481173504>")
            .setFooter("!helpall for all commands")
            .setTimestamp();
        general.send({
            embed
        }).catch(error);
    }
    guild.createRole({
        name: 'Muted',
        color: 'GREY',
        permissions: ['READ_MESSAGE_HISTORY']
    });
    bot.user.setPresence({ activity: { name: bot.guilds.cache.size + " servers | !help | !invite" }, status: 'online' });

    for (const chan of guild.channels.values()) {
        chan.overwritePermissions(chan.guild.roles.cache.find("name", "Muted"), { SEND_MESSAGES: false, ADD_REACTIONS: false, CONNECT: false }).catch(console.error);
    }
});
bot.on("channelCreate", function (channel) {
    try {
        channel.createOverwrite(channel.guild.roles.cache.find("name", "Muted"), { SEND_MESSAGES: false, ADD_REACTIONS: false, CONNECT: false }).catch(e);
    } catch (e) { }
});
bot.on("guildDelete", function (guild) {
    console.log("Left: " + guild.name + " id: " + guild.id);
    bot.channels.cache.get("433748188315254802").send("Left " + guild.name + " id: " + guild.id);
    bot.user.setPresence({ activity: { name: bot.guilds.cache.size + " servers | !help | !invite" }, status: 'online' })
});






bot.on("guildCreate", function (guild) {
    dbl.postStats(bot.guilds.cache.size);
});
bot.on('ready', () => {
    setInterval(() => {
        dbl.postStats(bot.guilds.cache.size);
    }, 900000);
});





//S U P P O R T  S E R V E R 


bot.on('guildMemberAdd', (member) => {
    try {
        let guild = member.guild;
        var embed = new Discord.MessageEmbed()
            .setAuthor('User Joined')
            .setDescription(`**${member.user.username}** has joined the server`)
            .setThumbnail(member.user.displayAvatarURL())
            .setColor('#0ccc25')
            .setTimestamp();
        guild.channels.get('439561990214516736').send({ embed }).catch(console.error);
    } catch (error) {
    }
});

bot.on('guildMemberRemove', (member) => {
    try {
        let guild = member.guild;
        var embed = new Discord.MessageEmbed()
            .setAuthor('User Left')
            .setDescription(`**${member.user.username}** has left the server`)
            .setThumbnail(member.user.displayAvatarURL())
            .setColor('#C94831')
            .setTimestamp();
        guild.channels.get('439561990214516736').send({ embed }).catch(console.error);
    } catch (error) {
    }
});




bot.on('guildMemberAdd', (member) => {
    try {
        if (member.guild.id === "431640227170353152") {
            let rolebungo = member.guild.roles.find("name", "Users");
            member.addRole(rolebungo).catch(console.error);
        }
    } catch (error) {
    }
});

bot.on('guildBanAdd', (guild, user) => {
    if (guild.id === "431640227170353152") {
        guild.channels.get("467049067399086081").send(user.username + " Was banned");
    }
});
bot.on('guildBanRemove', (guild, user) => {
    if (guild.id === "431640227170353152") {
        guild.channels.get("467049067399086081").send(user.username + " Was unbanned");
    }
});

bot.on('messageDelete', (msg) => {
    if (msg.author.bot === false) {
        if (msg.guild.id === "431640227170353152") {
            var embed = new Discord.MessageEmbed()
                .setAuthor("Message deleted by " + msg.author.username, msg.author.displayAvatarURL())
                .addField("Message deleted in " + msg.channel.name, msg.content)
                .setTimestamp()
                .setColor('#c10101')
            bot.channels.cache.get("467049067399086081").send({
                embed
            });
        }
    }
});
bot.on('messageUpdate', (oldMessage, newMessage) => {
    if (oldMessage.guild === true) {
        if (oldMessage.guild.id === "404091963609055233") {
            if (oldMessage.author.bot === false) {
                if (oldMessage.content !== newMessage.content) {
                    if (oldMessage.content) {
                        if (newMessage.content) {
                            var embed = new Discord.MessageEmbed()
                                .setAuthor("Message edited by " + oldMessage.author.username, oldMessage.author.displayAvatarURL())
                                .addField("Old message in " + oldMessage.channel.name, oldMessage)
                                .addField("New message in " + oldMessage.channel.name, newMessage)
                                .setTimestamp()
                                .setColor('#b220e8')
                            bot.channels.cache.get("467049067399086081").send({
                                embed
                            }).catch(console.error);
                        }
                    }
                }
            }
        }
    }
});


bot.on("message", function (msg) {
    if (msg.guild) {
        if (msg.guild.id === "431640227170353152") {
            if (msg.content.includes("discord.gg")) {
                msg.delete();
                msg.reply("No advertsing other servers");
            }
        }
    }
});


// E N D  S U P P O R T  S E R V E R 

/*
    bot.on("message", function(msg) {
        if (msg.content === "!rank") {
            if (msg.author.id == "105747712481173504") {
                msg.channel.send("Winner");
            } else {
                msg.channel.send("Loser");
            }
        }
    });*/

bot.on("error", (e) => console.error(e));

bot.on("message", function (msg) {
    if (msg.channel.type === 'dm') {
        if (msg.author.id === "185124264091844608") {
            bot.channels.cache.get("221245017262391296").send(msg.author + "sent a message to me:\n" + msg.content);
        }
    }
});

bot.on("message", (msg) => checkMessageForCommand(msg, false));
bot.on("messageUpdate", (oldMessage, newMessage) => {
    checkMessageForCommand(newMessage, true);
});
/*
    bot.on("message", function (msg) {
        if (msg.channel.id === "119130029140606978") { //skrub discord
            if (msg.author.bot === false) {
                if (msg.content) {
                    bot.channels.cache.get("410575145757835266").send(msg.author.username + ": " + msg.content); //my discord
                }
            }
        }
    });
    bot.on("message", function (msg) {
        if (msg.channel.id === "410575145757835266") { //my discord
            if (msg.author.bot === false) {
                if (msg.content) {
                    bot.channels.cache.get("119130029140606978").send(msg.content); //skrub discord
                }
            }
        }
    });

    bot.on("message", function (msg) {
        if (msg.channel.id === "361589659069054977") { //rambo
            if (msg.author.bot === false) {
                if (msg.content.includes("<@105747712481173504>") === false) {
                    if (msg.content.includes("@Hoffay") === false) {
                        if (msg.content) {
                            bot.channels.cache.get("413147927221895188").send(msg.author.username + ": " + msg.content); //my discord
                        }
                    }
                }
            }
        }
    });
    bot.on("message", function (msg) {
        if (msg.channel.id === "413147927221895188") { //my discord
            if (msg.author.bot === false) {
                if (msg.content) {
                    bot.channels.cache.get("361589659069054977").send(msg.content); //rambo
                }
            }
        }
    });
*/


exports.addCommand = function (commandName, commandObject) {
    try {
        commands[commandName] = commandObject;
    } catch (err) {
        console.log(err);
    }
};
exports.commandCount = function () {
    return Object.keys(commands).length;
};

bot.login(AuthDetails.token);
