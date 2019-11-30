// 发送网络请求获取DOM
const superagent = require('superagent');
// 获取DOM节点工具
const cheerio = require('cheerio');

// 获取ONE内容
const getOne = () => {
    // ONE的web版网站
    const OneUrl = "http://wufazhuce.com/";
    
    return new Promise((resolve,reject) => {
        superagent.get(OneUrl).end(function(err,res) {
            if(err) {
               console.log(err);
            }

            let $ = cheerio.load(res.text);
            let selectItem = $('#carousel-one .carousel-inner .item');

            //获取轮播图第一个页面，也就是当天更新的内容
            let todayOne = selectItem[0]; 

            //保存到一个json中
            let todayOneData = {
                imgUrl: $(todayOne).find('.fp-one-imagen').attr('src'),
                type: $(todayOne).find('.fp-one-imagen-footer').text().replace(/(^\s*)|(\s*$)/g, ""),
                text: $(todayOne).find('.fp-one-cita').text().replace(/(^\s*)|(\s*$)/g, "")
            };
            
            // console.log(todayOneData)
            resolve(todayOneData)
        })
    })
}

// 获取天气预报
const getWeather = (local) => {
    // moji天气网址
    const WeatherUrl = "https://tianqi.moji.com/weather/china/" + local;
    return new Promise((resolve,reject) => {
        superagent.get(WeatherUrl).end(function(err, res) {
            if (err) {
                reject(err);
            }

            let threeDays = [];
            let tip = "";
            let $ = cheerio.load(res.text);
            
            $(".wea_tips").each(function(i, elem) {
                tip = $(elem).find("em").text();
            })
            
            $(".forecast .days").each(function(i, elem) {
                const SingleDay = $(elem).find("li")
                threeDays.push({
                    Day: $(SingleDay[0]).text().replace(/(^\s*)|(\s*$)/g, ""),
                    WeatherImgUrl: $(SingleDay[1]).find("img").attr("src"),
                    WeatherText: $(SingleDay[1]).text().replace(/(^\s*)|(\s*$)/g, ""),
                    Temperature: $(SingleDay[2]).text().replace(/(^\s*)|(\s*$)/g, ""),
                    WindDirection: $(SingleDay[3]).find("em").text().replace(/(^\s*)|(\s*$)/g, ""),
                    WindLevel: $(SingleDay[3]).find("b").text().replace(/(^\s*)|(\s*$)/g, ""),
                    Pollution: $(SingleDay[4]).text().replace(/(^\s*)|(\s*$)/g, ""),
                    PollutionLevel: $(SingleDay[4]).find("strong").attr("class")
                })
            })
            
            // console.log(tip, threeDays)
            resolve({
                tip,
                threeDays
            })
        })
    })
}

module.exports = {
    getOne,
    getWeather
}
