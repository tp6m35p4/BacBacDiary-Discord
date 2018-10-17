const discord = require('discord.js');
const loginConfig = require('../config/discord.json');
var client = new discord.Client();
const msgDectection = require('./msgDectection');

client.on('ready', () => {
    console.log('白白教萬歲');
});
client.on('message', msg => {
    msgDectection.main(msg, function(msgStatus, res) {
        switch(msgStatus) {
            //fliter by send
            case 1:
                msg.channel.send(res);
                break;
            //fliter by reply
            case 2:
                msg.reply(res);
            default:
                return;
        }
    });
});  

exports.login = function() {
    client.login(loginConfig.token);
}
