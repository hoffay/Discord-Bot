console.log("Loaded utility.js");
try {
    var yt = require("./youtube_plugin");
    var youtube_plugin = new yt();
} catch (e) {
    console.log("couldn't load youtube plugin!\n" + e.stack);
}
exports.commands = [
    "op",
    "youtube",
    "ud",
    "dict",
    "fortnitestats",
    "fn",
    "avatar",
    "flipcoin"

];


exports.youtube = {
    category: "utility",
    usage: "Youtube search",
    process: function (bot, msg, suffix) {
        youtube_plugin.respond(suffix, msg.channel, bot);
    }

};

exports.op = {
    category: "utility",
        usage: "Op.gg search",
        process: function (bot, msg, suffix) {
            
                if (msg.content.includes(" ")) {
                    var opword = suffix.replace(/ /g, '');
                    msg.channel.send("http://na.op.gg/summoner/userName=" + opword);
                } else {
                    msg.channel.send("http://na.op.gg/summoner/userName=" + suffix);
                }
        }
};

exports.ud = {
    category: "utility",
    usage: "Urban Dictionary search",
    process: function (bot, msg, suffix) {
            if (msg.content.includes(" ")) {
                var udword = suffix.replace(/ /g, '%20');
                msg.channel.send("http://www.urbandictionary.com/define.php?term=" + udword);
            } else {
                msg.channel.send("http://www.urbandictionary.com/define.php?term=" + suffix);
            }
    }
};

exports.dict = {
    category: "utility",
    usage: "Dictionary search",
        process: function (bot, msg, suffix) {
            if (msg.content.includes(" ")) {
                var dictword = suffix.replace(/ /g, '%20');
                msg.channel.send("https://www.merriam-webster.com/dictionary/" + dictword);
            } else {
                msg.channel.send("https://www.merriam-webster.com/dictionary/" + suffix);
            }
        }
};

exports.fortnitestats = {
    category: "utility",
    usage: "Fortnite stat search (PC only)",
    process: function (bot, msg, suffix) {
            if (msg.content.includes(" ")) {
                var opword = suffix.replace(/ /g, '%20');
                msg.channel.send("https://stormshield.one/pvp/stats/" + opword);
            } else {
                msg.channel.send("https://stormshield.one/pvp/stats/" + suffix);
            }
    }
};
exports.fn = {
    category: "utility",
    usage: "Fortnite stat search (PC only) same as !fortnitestats",
    process: function (bot, msg, suffix) {
        if (msg.content.includes(" ")) {
            var opword = suffix.replace(/ /g, '%20');
            msg.channel.send("https://stormshield.one/pvp/stats/" + opword);
        } else {
            msg.channel.send("https://stormshield.one/pvp/stats/" + suffix);
        }
    }
};  

exports.avatar = {
    category: "utility",
    usage: "Your avatar",
    process: function (bot, msg, suffix) {
        if (suffix) {
            msg.channel.send(msg.mentions.users.first().displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }));
        } else {
            msg.channel.send(msg.author.displayAvatarURL({format: 'png', dynamic: true, size: 2048 }));
        }
    }
};

exports.flipcoin = {
    category: "utility",
    usage: "Flips a coin",
    process: function (bot, msg) {
        if (Math.random() >= 0.5) {
            msg.channel.send("**The coin landed on heads**");
        } else {
            msg.channel.send("**The coin landed on tails**");
        }
    }
};

