const { mongo } = require('../config/index')

const mongoose = require("mongoose");
// const Promise = require("bluebird");
mongoose.connect(`mongodb://${mongo.host}:${mongo.port}/${mongo.database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const mongodb = mongoose.connection;
mongodb.once("error", function (error) {
    if(error) console.log("数据库连接失败：" + error);
});
mongodb.once("open", function () {
    console.log("------数据库连接成功！------");
});