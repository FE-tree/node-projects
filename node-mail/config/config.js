/**
 * 配置文件
 **/

module.exports = {
    // 当地拼音, 用来拼接moji天气url
    local: "guangdong/guangzhou",
    // 纪念日
    startDay: "2010/01/01",
    // 邮件信息
    mail: {
        // 发送者邮箱厂家
        emailService: 'QQ',
        // SMTP端口 QQ的为465或587
        port: 465,
        // 发送者邮箱账户SMTP授权码
        auth: {
            user: "***@qq.com",
            pass: "*****************"
        },
        // 发送者昵称与邮箱地址
        from: '"***" <***@qq.com>',
        // 接收者邮箱地址
        to: '***@qq.com',
        // 邮件地址
        subject: "一封给***的小邮件"
    },
    // 每日发送时间
    sendTime: {
        hour: 5,
        minute: 20,
        second: 0
    }
}
