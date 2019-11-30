const nodemailer = require("nodemailer");   // 发送邮件的node插件
const ejs = require("ejs");                 // ejs模版引擎
const fs = require("fs");                   // 文件读写
const path = require("path");               // 路径配置
const schedule = require("node-schedule");  // 定时器任务库

const conf =  require('./config/config')
const data = require('./codes/cheerio+superagent')

const HtmlData = {}

function sendMail(HtmlData) {
    const template = ejs.compile(
        fs.readFileSync(path.resolve(__dirname, "email.ejs"), "utf8")
    );
    const html = template(HtmlData);
  
    let transporter = nodemailer.createTransport({
        service: conf.mail.emailService,
        port: conf.mail.port,
        secureConnection: true,
        auth: conf.mail.auth
    });
    let mailOptions = {
        from: conf.mail.from,
        to: conf.mail.to,
        subject: conf.mail.subject,
        html: html
    };

    transporter.sendMail(mailOptions, (error, info={}) => {
        if (error) {
            console.log(error);
            sendMail(HtmlData); //再次发送
        }
        console.log("邮件发送成功", info.messageId);
        console.log("静等下一次发送");
    });
}

function getAllData() {
    let today = new Date();
    console.log(today)
    let initDay = new Date(conf.startDay);
    let lastDay = Math.floor((today - initDay) / 1000 / 60 / 60 / 24);
    let todaystr = today.getFullYear() + " / " + (today.getMonth() + 1) + " / " + today.getDate();
    HtmlData["lastDay"] = lastDay;
    HtmlData["todaystr"] = todaystr;

    Promise.all([data.getOne(),data.getWeather(conf.local)]).then(
        function(data){
            HtmlData["todayOneData"] = data[0];
            HtmlData["weatherTip"] = data[1].tip;
            HtmlData["threeDaysData"] = data[1].threeDays;
            console.log(HtmlData)

            sendMail(HtmlData)
        }
    ).catch(function(err) {
        getAllData() // 再次获取
        console.log('---获取数据失败---', JSON.stringify(err));
    })
}

const scheduleCarry = ()=>{
    let time = conf.sendTime.second + ' ' + conf.sendTime.minute + ' ' + conf.sendTime.hour + ' * * *'
    schedule.scheduleJob(time, function() {
        getAllData()
        console.log('任务执行:' + new Date().toLocaleString());
    });
}
scheduleCarry();
