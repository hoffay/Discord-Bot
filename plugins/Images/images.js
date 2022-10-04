console.log("loaded images.js");
var request = require("request");
var AuthDetails = require("../../auth.json");
var lily = "217024494106050560";

try {
    var Discord = require("discord.js");
} catch (e) {
    console.log(e.stack);
    console.log(process.version);
    console.log("Please run npm install and ensure it passes with no errors!");
    process.exit();
}

var Permissions = {};
try {
    Permissions = require("./permissions.json");
} catch (e) {
    Permissions.global = {};
    Permissions.users = {};
}


Permissions.checkPermission = function(user, permission) {
    try {
        var allowed = true;
        try {
            if (Permissions.global.hasOwnProperty(permission)) {
                allowed = Permissions.global[permission] === true;
            }
        } catch (e) {}
        try {
            if (Permissions.users[user.id].hasOwnProperty(permission)) {
                allowed = Permissions.users[user.id][permission] === true;
            }
        } catch (e) {}
        return allowed;
    } catch (e) {}
    return false;
};
exports.commands = [
    "image",
    "gif",
	"g",
    "i"

];
try {


    exports.image = {
        category: "image",
        usage: "google image search",
        process: function(bot, msg, args) {

            if (!AuthDetails || !AuthDetails.youtube_api_key || !AuthDetails.google_custom_search) {
                msg.channel.send("Image search requires both a YouTube API key and a Google Custom Search key!");
                return;
            }

            var page = 1; //we request 10 items
            request("https://www.googleapis.com/customsearch/v1?key=" + AuthDetails.youtube_api_key + "&cx=" + AuthDetails.google_custom_search + "&q=" + (args.replace(/\s/g, '+')) + "&searchType=image&alt=json&num=3&start=" + page, function(err, res, body) {
                var data, error;
                try {
                    data = JSON.parse(body);
                } catch (error) {
                    console.log(error);
                    return;
                }
                if (!data) {
                    console.log(data);
                    msg.channel.send("Error:\n" + JSON.stringify(data));
                    return;
                } else if (!data.items || data.items.length === 0) {
                    console.log(data);
                    msg.channel.send("No result for '" + args + "'");
                    return;
                }
                var randResult = data.items[0];

                if (Permissions.checkPermission(msg.author, "images")) {
                    if (msg.channel) {
					if (msg.author.id !=="287995574945579018") {
                        msg.channel.send(randResult.title + '\n' + randResult.link);
                    
					}
					}
                } else {
                    msg.channel.send(msg.author + " doesn't have permission to use this command!");

                }

            });
        }
    };
    exports.i = {
        category: "image",
        usage: "google image search (3 images)",
        process: function(bot, msg, args) {

            if (!AuthDetails || !AuthDetails.youtube_api_key || !AuthDetails.google_custom_search) {
                msg.channel.send("Image search requires both a YouTube API key and a Google Custom Search key!");
                return;
            }

            var page = 1; //we request 10 items
            request("https://www.googleapis.com/customsearch/v1?key=" + AuthDetails.youtube_api_key + "&cx=" + AuthDetails.google_custom_search + "&q=" + (args.replace(/\s/g, '+')) + "&searchType=image&alt=json&num=3&start=" + page, function(err, res, body) {
                var data, error;
                try {
                    data = JSON.parse(body);
                } catch (error) {
                    console.log(error);
                    return;
                }
                if (!data) {
                    console.log(data);
                    msg.channel.send("Error:\n" + JSON.stringify(data));
                    return;
                } else if (!data.items || data.items.length === 0) {
                    console.log(data);
                    msg.channel.send("No result for '" + args + "'");
                    return;
                }
                var randResult1 = data.items[0];
                var randResult2 = data.items[1];
                var randResult3 = data.items[2];
                if (Permissions.checkPermission(msg.author, "images")) {
                    if (msg.channel) {
					if (msg.author.id !=="287995574945579018") {
                        if (msg.author.id !== lily) {
                        msg.channel.send(randResult1.title + '\n' + randResult1.link + '\n' + randResult2.title + '\n' + randResult2.link + '\n' + randResult3.title + '\n' + randResult3.link);
                    } else {}
					}
					}
                } else {
                    msg.channel.send(msg.author + " doesn't have permission to use this command!");

                }

            });
        }
    };
    exports.gif = {
        category: "image",
        usage: "google gif search",
        process: function(bot, msg, args) {
            //gets us a random result in first 5 pages
            var page = 1 + Math.floor(Math.random() * 5) * 10; //we request 10 items
            request("https://www.googleapis.com/customsearch/v1?key=" + AuthDetails.youtube_api_key + "&cx=" + AuthDetails.google_custom_search + "&q=" + (args.replace(/\s/g, '+')) + "&searchType=image&alt=json&num=3&start=" + page + "&fileType=gif", function(err, res, body) {
                var data, error;
                try {
                    data = JSON.parse(body);
                } catch (error) {
                    console.log(error);
                    return;
                }
                if (!data) {
                    console.log(data);
                    msg.channel.send("Error:\n" + JSON.stringify(data));
                    return;
                } else if (!data.items || data.items.length === 0) {
                    console.log(data);
                    msg.channel.send("No result for '" + args + "'");
                    return;
                }
                var randResult = data.items[Math.floor(Math.random() * data.items.length)];
                if (Permissions.checkPermission(msg.author, "images")) {
                    if (msg.channel) {
					if (msg.author.id !=="287995574945579018") {
                        msg.channel.send(randResult.title + '\n' + randResult.link);
					}
					}
                } else {
                    msg.channel.send(msg.author + " doesn't have permission to use this command!");

                }
            });

        }
    };
    exports.g = {
        category: "image",
        usage: "google gif search",
        process: function(bot, msg, args) {
            //gets us a random result in first 5 pages
            var page = 1 + Math.floor(Math.random() * 5) * 10; //we request 10 items
            request("https://www.googleapis.com/customsearch/v1?key=" + AuthDetails.youtube_api_key + "&cx=" + AuthDetails.google_custom_search + "&q=" + (args.replace(/\s/g, '+')) + "&searchType=image&alt=json&num=3&start=" + page + "&fileType=gif", function(err, res, body) {
                var data, error;
                try {
                    data = JSON.parse(body);
                } catch (error) {
                    console.log(error);
                    return;
                }
                if (!data) {
                    console.log(data);
                    msg.channel.send("Error:\n" + JSON.stringify(data));
                    return;
                } else if (!data.items || data.items.length === 0) {
                    console.log(data);
                    msg.channel.send("No result for '" + args + "'");
                    return;
                }
                var randResult1 = data.items[0];
                var randResult2 = data.items[1];
                var randResult3 = data.items[2];
                if (Permissions.checkPermission(msg.author, "images")) {
                    if (msg.author.id !== lily) {
					if (msg.author.id !=="287995574945579018") {
                        msg.channel.send(randResult1.title + '\n' + randResult1.link + '\n' + randResult2.title + '\n' + randResult2.link + '\n' + randResult3.title + '\n' + randResult3.link);
						}
                    } else {}
                } else {
                    msg.channel.send(msg.author + " doesn't have permission to use this command!");

                }
            });

        }
    };

} catch (e) {}