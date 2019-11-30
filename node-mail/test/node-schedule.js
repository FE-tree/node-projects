    
var schedule = require("node-schedule");  

//1. 确定的时间执行
var date = new Date(2019,5,14,15,50,0);  
schedule.scheduleJob(date, function(){  
   console.log("执行任务_1");
});

//2. 秒为单位执行 
//比如:每5秒执行一次
var rule1     = new schedule.RecurrenceRule();  
var times1    = [1,6,11,16,21,26,31,36,41,46,51,56];  
rule1.second  = times1;  
schedule.scheduleJob(rule1, function(){
    console.log("执行任务_2");    
});

//3.以分为单位执行
//比如:每5分种执行一次
var rule2     = new schedule.RecurrenceRule();  
var times2    = [1,6,11,16,21,26,31,36,41,46,51,56];  
rule2.minute  = times2;  
schedule.scheduleJob(rule2, function(){  
    console.log("执行任务_3");    
});  

//4.以天单位执行
//比如:每天6点30分执行
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = 6;
rule.minute =30;
var j = schedule.scheduleJob(rule, function(){
 　　　　console.log("执行任务_4");
        getData();
});

const scheduleCarry = ()=>{
    // Cron风格定时器
    // 每分钟的0-10秒的时候执行
    schedule.scheduleJob('0-10 * * * * *',()=>{
        console.log('任务执行:' + new Date());
    });
    // 每30秒执行
    schedule.scheduleJob('30 * * * * *',()=>{
        console.log('任务执行:' + new Date());
    });
    // 每天的15:52:30执行
    schedule.scheduleJob('30 52 15 * * *',()=>{
        console.log('任务执行:' + new Date());
    });
    // 对象文本语法定时器
    // 每周二的15:52执行，参数如下
    // dayOfWeek
    // month
    // dayOfMonth
    // hour
    // minute
    // second
    schedule.scheduleJob({hour: 15, minute: 52, dayOfWeek: 2}, function(){
        console.log('任务执行:' + new Date());
    });

    // second: 30, minute: 55, hour: 15, dayOfWeek: 2}
    // '30 * * * * *'
    schedule.scheduleJob({second:[1,6,11,16,21,26,31,36,41,46,51,56]}, function() {
        console.log('任务执行:' + new Date().toLocaleString());
    });
}
// 定时器取消
// scheduleCarry.cancel();
