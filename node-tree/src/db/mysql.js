const mysql = require('mysql2');
const { mysql_conf } = require('../config/index');

// 创建链接对象
const db = mysql.createConnection(mysql_conf);
db.connect((err) => {
    if(err) {
        throw(err);
    }
    console.log('MySql Connected...')
});

// 开始链接
db.connect()

// 执行sql语句的函数
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
            if (err) {
                console.log('[query] - :' + err)
                reject(err)
                return
            }
            // 把results对象转为字符串，去掉RowDataPacket，再把results字符串转为json对象
            results = JSON.parse(JSON.stringify(results)) 
            resolve(results)
        })  
    })
    return promise
}

module.exports = {
    exec,
    escape: mysql.escape
}