/*
** image spider from baidu image
*/

const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const os = require("os");
const program = require("commander");
const inquirer = require("inquirer");
const chalk = require("chalk");
const { convert2Img, autoScroll } = require("./code/tools");
const consoler = require("./code/consoler");

console.log(chalk.cyan(consoler()));

program
    .version("1.0.0", "-v --version")
    .description("img-spider is a spider get images from image.baidu.com")
    .option("-k, --key [key]", "input the image keywords to download")
    .option("-i, --interval [interval]", "input the operation interval(ms,default 200)", parseFloat)
    .option("-n, --number [number]", "input the operation interval(ms,default 200)", parseInt)
    .option("-m, --headless [headless]", "choose whether the program is running in headless mode")
    .action(option => {
        let config = Object.assign(
            {
                key: "",
                interval: 0,
                number: 0,
                head: false
            },
            option
        );
        let promps = [];
    
        console.log(chalk.yellow("==================================================="));
        console.log(chalk.green ("  Image spider version 1.0.0 designed by PE-tree "));
        console.log(chalk.yellow("==================================================="));

        if (!config.key) {
            promps.push({
                type: "input",
                name: "key",
                default: "狗",
                message: "Please input the image keywords to download",
                validate: function(input) {
                    if (!input) {
                        return "Can't be empty!";
                    }
                    return true;
                }
            });
        }
        if (config.interval === 0) {
            promps.push({
                type: "input",
                name: "interval",
                default: 200,
                message: "Please input the operation interval(ms)"
            });
        }
      
        if (config.number === 0) {
            promps.push({
                type: "input",
                name: "number",
                default: 10,
                message: "Please input the download numbers(1-1000)"
            });
        }
      
        if (config.head === false) {
            promps.push({
                type: "confirm",
                name: "headless",
                default: true,
                message: "Is the program running in headless mode?"
            });
        }

        inquirer.prompt(promps).then(function(answers) {
            const { key, interval, number, headless } = answers;
            const folder = 'img-spider';
            // 存放C盘 - C:\Users\tree\img-spider\
            // const home = os.homedir();
            // const base = path.join(home, folder);
            // const target = path.join(base, key)
            // 当前目录
            const target = path.join('bin/' + folder, key)
            if (!fs.existsSync(base)) {
                fs.mkdirSync(base);
            }
            if (!fs.existsSync(target)) {
                fs.mkdirSync(target);
            }
            
            const spider = async () => {
                const browser = await puppeteer.launch({ headless: headless });
                const page = await browser.newPage();
                // await page.setViewport({ width: 2000, height: 800, });
                await page.goto("https://image.baidu.com");
                console.log(chalk.yellow("go to https://image.baidu.com"));
                
                const searchInput = await page.$("#kw");
                await searchInput.focus();
                await page.keyboard.type(key);
                const searchBtn = await page.$(".s_search");
                await searchBtn.click();
                console.log(chalk.blue("go to search list"));                
            
                await page.waitForSelector('#imgid');

                page.on("load", async () => {
                    if (number * 1 > 20) {
                      await autoScroll(page);
                    }
                    console.log(chalk.magenta("page loading done, start fetch..."));

                    const srcs = await page.evaluate(() => {
                        const images = document.querySelectorAll("img.main_img");
                        return Array.prototype.map.call(images, img => img.src);
                    });
                    console.log(
                        chalk.redBright(
                            `Get ${srcs.length} images totally, start download the first ${number * 1} images`
                        )
                    );
            
                    for (let i = 0; i < srcs.length && i < number * 1; i++) {
                        // sleep
                        await page.waitFor(interval * 1);
                        await convert2Img(srcs[i], target);
                        console.log(
                            chalk.greenBright(
                                `images finish progress ${i + 1}/${Math.min(srcs.length, number * 1)}`
                            )
                        );
                    }
            
                    console.log(chalk.green.bold(`job finished! The images are stored in ${target}`));
                    await browser.close();
                })
            }
            spider();
        })

    })

program.parse(process.argv);
