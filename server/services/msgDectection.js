const mysql = require('./mysql');

const seeSayRe = /^see [\w\u4e00-\u9fa5]{1,} say [\w\u4e00-\u9fa5]{1,}/;
// const seeSayBan = {
//     'see': 'say'
// };
// var seeSayDict = {
//     喵: '喵喵'
// };
exports.main = function(msg, callback) {
    // console.log(seeSayRe.test(msg.content));
    mysql.checkSeeSay(msg.content, function(status, text) {
        if (status) {
            callback(1, text);
        }
    });
    // console.log(checkSeeSayRes);
    
    if (seeSayRe.test(msg.content)) {

        console.log('fit see say');
        var splitedMsg = msg.content.split(' ');
        mysql.insertSeeSay(splitedMsg[1], splitedMsg[3]);
        
        callback(1, `${msg.author} 白白記住了`);
        // if (!(splitedMsg[1] in seeSayBan)) {
        //     seeSayDict[splitedMsg[1]] = splitedMsg[3];
        //     console.log(seeSayDict);
        //     callback(1, `${msg.author} 白白記住了`);
        // }
    }
    if (msg.content.startsWith('統神')) {
        callback(1, `太神啦 ${msg.author}`);
    }
    if (msg.content == '88') {
        callback(2, `弄尼姑囉`);
    }
    callback(-1, null);
    if (msg.content === '...') {
        var attachment = new discord.Attachment('https://imgur.com/cGYmIMc.png');
        msg.channel.send(attachment);
    }
    if (msg.content === '???') {
        var attachment = new discord.Attachment('https://i.imgur.com/jJgqalh.png');
        msg.channel.send(attachment);
    }
};