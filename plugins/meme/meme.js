//IMAGE PROCESSING
console.log("Loaded meme.js");
exports.commands = [
    "hat",
    "makememe",
    "ifunny",
    "jpeg",
    "flip"
];

const Discord = require('discord.js');
const Canvas = require('canvas');
const requestImageSize = require('request-image-size');

function imageselect(msg) {
    var cmdTxt = msg.content.split(" ")[0].substring(1);
    var suffix = msg.content.substring(cmdTxt.length + 2);
    if (suffix) {
        if (suffix.includes("http")) {
            baseimage = suffix;
            return baseimage;
        } else if (suffix.includes("@")) {
            baseimage = msg.mentions.users.first().displayAvatarURL({ format: 'png', dynamic: true, size: 2048 });
            return baseimage;
        }
    } else {
        baseimage = msg.author.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 });
        return baseimage;
    }
}

exports.hat = {
    category: "meme",
    usage: "Give yourself or another image a hat: !hat",
    process: async function (bot, msg) {

        const canvas = Canvas.createCanvas(1200, 1200);
        const ctx = canvas.getContext('2d');
        hatx = 299;
        haty = 204;
        hatx = 2 * hatx;
        haty = 2 * haty;
        ctx.save();

        ctx.beginPath();
        ctx.arc(600, 700, 500, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        imageselect(msg);

        const avatar = await Canvas.loadImage(baseimage);
        ctx.drawImage(avatar, 100, 200, 1000, 1000);
        ctx.restore();

        const foreground = await Canvas.loadImage('./hat.png');
        ctx.drawImage(foreground, canvas.width / 2 - hatx / 2, 0, hatx, haty);
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'hat.png');

        msg.channel.send(attachment);

    }
};
exports.makememe = {
    category: "meme",
    usage: "!makememe url, toptext, bottomtext",
    process: async function (bot, msg) {
        var meme = msg.content.split(",");
        meme[0] = meme[0].substr(9);

        var dimensions = await requestImageSize(meme[0]).catch(err => console.error(err));
        const canvas = Canvas.createCanvas(dimensions.width, dimensions.height);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage(meme[0]);
        ctx.drawImage(background, 0, 0, dimensions.width, dimensions.height);

        scaler = canvas.height / 585;
        scalerWidth = 718 * scaler;
        scalerHeight = 19 * scaler;

        ctx.font = 45 * scaler + 'px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.miterLimit = 2;
        ctx.lineWidth = 8 * scaler;
        textWidth = ctx.measureText(meme[1]).width;
        topoffset = .1;
        bottomoffset = .97;

        ctx.strokeText(meme[1], dimensions.width / 2 - textWidth / 2, dimensions.height * topoffset);
        ctx.fillText(meme[1], dimensions.width / 2 - textWidth / 2, dimensions.height * topoffset);

        textWidth = ctx.measureText(meme[1]).width;
        ctx.strokeText(meme[2], dimensions.width / 2 - textWidth / 2, dimensions.height * bottomoffset);
        ctx.fillText(meme[2], dimensions.width / 2 - textWidth / 2, dimensions.height * bottomoffset);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'meme.png');
        msg.channel.send(attachment);
    }
};
exports.ifunny = {
    category: "meme",
    usage: "Add an ifunny logo to your avatar or an image: !ifunny url",
    process: async function (bot, msg) {
        imageselect(msg);

        var dimensions = await requestImageSize(baseimage).catch(err => console.error(err));
        const canvas = Canvas.createCanvas(dimensions.width, dimensions.height);
        const ctx = canvas.getContext('2d');

        const baseimageLoad = await Canvas.loadImage(baseimage);
        ctx.drawImage(baseimageLoad, 0, 0, dimensions.width, dimensions.height);

        scaler = canvas.width / 718; //multiplier to scale ifunny image                                     
        scalerWidth = 718 * scaler;
        scalerHeight = 19 * scaler;

        const ifunny = await Canvas.loadImage('./ifunnywatermark.png');
        ctx.drawImage(ifunny, 0, canvas.height - scalerHeight, scalerWidth, scalerHeight); //change to scale

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'ifunny.jpeg');
        msg.channel.send(attachment);
    }
};

exports.jpeg = {
    category: "meme",
    usage: "Give your picture a little more jpeg: !jpeg url",
    process: async function (bot, msg) {
        imageselect(msg); //Gets image from function

        var dimensions = await requestImageSize(baseimage).catch(err => console.error(err));
        const canvas = Canvas.createCanvas(dimensions.width, dimensions.height);
        const ctx = canvas.getContext('2d');

        const baseimageLoad = await Canvas.loadImage(baseimage);
        ctx.drawImage(baseimageLoad, 0, 0, dimensions.width, dimensions.height);

        scaler = canvas.width / 718; //multiplier to scale ifunny image                                     
        scalerWidth = 718 * scaler;
        scalerHeight = 19 * scaler;

        const attachment = new Discord.MessageAttachment(canvas.toBuffer('image/jpeg', {
            quality: .05
        }));
        msg.channel.send(attachment);
    }
};

exports.flip = {
    category: "meme",
    usage: "Flip your picture !flip url",
    process: async function (bot, msg) {
        imageselect(msg); //Gets image from function

        var dimensions = await requestImageSize(baseimage).catch(err => console.error(err));
        const canvas = Canvas.createCanvas(dimensions.width, dimensions.height);
        const ctx = canvas.getContext('2d');

        const baseimageLoad = await Canvas.loadImage(baseimage);

        ctx.clearRect(0, 0, canvas.width, canvas.height); //clear the canvas
        ctx.translate(canvas.width, canvas.height); //let's translate
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        ctx.rotate(Math.PI); //increment the angle and rotate the image 
        ctx.drawImage(baseimageLoad, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'flip.png');
        msg.channel.send(attachment);
    }
};

