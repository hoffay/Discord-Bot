console.log("loaded owner.js");
exports.commands = [
    "setgame",
    "s",
    "spam",
    "eval"
];

exports.setgame = {
    category: "owner",
    process: function (bot, msg, suffix) {
        if (msg.author.id === "105747712481173504") {
            bot.user.setPresence({ activity: { name: suffix}, status: 'online' });
        }
    }
};

exports.s = {
    category: "owner",
    process: function (bot, msg, suffix) {
        if (msg.author.id === "105747712481173504") {
            msg.delete();
            msg.channel.send(suffix);
        }
    }
};
exports.spam = {
    category: "owner",
    process: function (bot, msg, suffix) {
        if (msg.author.id === "105747712481173504") {
            msg.delete();
            var spamMessage = "";
            for (i = 0; i < 20; i++) {
                spamMessage = spamMessage.concat(suffix);
                spamMessage = spamMessage.concat("\n");
            }
            msg.channel.send(spamMessage);
        }
    }
};

exports.eval = {
    category: "owner",
    process: function (bot, msg, suffix) {
        if (msg.author.id === "105747712481173504") {
            msg.channel.send(eval(suffix, bot)).then().catch(console.error);
        }
    }
};
