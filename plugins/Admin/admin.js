console.log("loaded admin.js");
exports.commands = [
    "mute",
    "unmute",
    "clear",
    "kick",
    "ban",
    "unban"

];


exports.mute = {
    category: "admin",
    usage: "Must have the administrator permission on this server. Do !adminhelp for more info",
    process: function (bot, msg, suffix) {
        try {
            if (msg.member.hasPermission("ADMINISTRATOR") || msg.author.id === "105747712481173504") {
                if (msg.content.includes("<@105747712481173504>")) {
                    msg.channel.send("Nice try though");
                } else {
                    let member1 = msg.mentions.members.first();
                    let role = msg.guild.roles.cache.find(r => r.name === "Muted");
                    member1.roles.add(role).catch(console.error);
                    msg.channel.send(member1 + "** Has been muted**");
                    try {
                        for (const chans of msg.guild.channels.cache.array()) {
                            chans.createOverwrite(role, { SEND_MESSAGES: false, ADD_REACTIONS: false, CONNECT: false }).catch(e);
                        }
                    } catch (e) { }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

};

exports.unmute = {
    category: "admin",
    usage: "Must have the administrator permission on this server. Do !adminhelp for more info",
    process: function (bot, msg, suffix) {
        try {
            if (msg.member.hasPermission("ADMINISTRATOR") || msg.author.id === "105747712481173504") {
                if (msg.content.includes("<@105747712481173504>")) {
                    msg.channel.send("Nice try though");
                } else {
                    let member1 = msg.mentions.members.first();
                    let role = msg.guild.roles.cache.find(r => r.name === "Muted");
                    member1.roles.remove(role).catch();
                    msg.channel.send(member1 + "** Has been unmuted**");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

};

exports.clear = {
    category: "admin",
    usage: "Must have the administrator permission on this server. Do !adminhelp for more info",
    process: function (bot, msg, suffix) {
        if (msg.member.hasPermission("ADMINISTRATOR") || msg.author.id === "105747712481173504") {
            try {
                var clearadmin = suffix.replace(/.*clear /g, "");
                let messagecount = parseInt(clearadmin);
                if (messagecount) {
                    msg.channel.messages.fetch({
                        limit: messagecount
                    }).then(messages => msg.channel.bulkDelete(messages)).catch(e => {msg.channel.send("I cannot delete messages older than 14 days old");});
                } else {
                    msg.channel.send("You must specify the amount of messages to clear");
                }
            } catch (error) {
            }
        }
    }
};

    exports.kick = {
        category: "admin",
        usage: "Must have the administrator permission on this server. Do !adminhelp for more info",
        process: function (bot, msg, suffix) {
            try {
                if (msg.member.hasPermission("ADMINISTRATOR") || msg.author.id === "105747712481173504") {
                    if (msg.content.includes("<@105747712481173504>")) {
                        msg.channel.send("Nice try though");
                    } else {
                        let kickmemeber = msg.mentions.members.first();
                        kickmemeber.kick().catch(error);
                        console.log(kickmemeber + " was kicked");
                        msg.channel.send(kickmemeber + " was kicked");
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        };

        exports.ban = {
            category: "admin",
            usage: "Must have the administrator permission on this server. Do !adminhelp for more info",
            process: function (bot, msg, suffix) {
                try {
                    if (msg.member.hasPermission("ADMINISTRATOR")) {
                        if (msg.content.includes("<@105747712481173504>")) {
                            msg.channel.send("Nice try though");
                        } else {
                            let member1 = msg.mentions.members.first();
                            member1.ban().catch(error);
                            console.log(member1 + " was banned");
                            msg.channel.send(member1 + " was banned");
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            };

            exports.unban = {
                category: "admin",
                usage: "Must have the administrator permission on this server. Do !adminhelp for more info",
                process: function (bot, msg, suffix) {
                    try {
                        if (msg.member.hasPermission("ADMINISTRATOR")) {
                            let member1 = msg.mentions.members.first();
                            member1.unban().catch(error);
                            console.log(member1 + " was unbanned");
                            msg.channel.send(member1 + " was unbanned");
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
                };



