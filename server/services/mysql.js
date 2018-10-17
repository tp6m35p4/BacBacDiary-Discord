const mysql = require('mysql');
var math = require('mathjs');
const config = require('../config/mysql.json');
const connection = mysql.createConnection(config);
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
});

function checkExists(see, callback) {
    connection.query("SELECT * FROM `seesay` WHERE `see` = " + connection.escape(see), function(error, results, fields) {
        
        if (error) throw error;
        if (results.length != 0) {
            var obj = {};
            
            obj[see] = results[0].say.split(",");
            
            callback(true, obj);
        }
        callback(false, null);
      });
}

exports.insertSeeSay = function(see, say) {
    checkExists(see, function(status, res) {
        // console.log('do insert');
        if (status) {
            res[see].push(say);
            connection.query("UPDATE `seesay` SET `say`=? WHERE `see` = ?", [res[see].join(), see]);
        } else {
            connection.query("INSERT INTO `seesay`(`id`, `see`, `say`) VALUES (NULL,?,?)", [see, say]);
        }
    });
};


exports.checkSeeSay = function(see, callback) {
    checkExists(see, function(status, res) {
        if (status) {
            callback(true, res[see][math.randomInt(0, res[see].length)]);
        }
        else callback(false, null);
    });
};