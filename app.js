const cron = require('node-cron');
var moment = require('moment');

const {Builder,By} = require("selenium-webdriver");
const config = {
    server: 'localhost:27017',
    database: 'BTCRSI',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
const crontime = (waitTimeInMs) => new Promise(resolve => setTimeout(run, waitTimeInMs));

let driver = new Builder().forBrowser("chrome").build();
driver.get("https://www.gate.io/en/trade/BTC_USDT");

zsdzsd();
crontime(5000);
async function zsdzsd(){
await sleep(10000);
var elems = await driver.findElements(By.css("#kline_tradingView_Indicator_box > li"));
elems[6].click();
}



// 0 00 06 * * ?
async function run (){

    cron.schedule('*/1 * * * * * ', async () => {
        await migrate();
    });
}
   async function migrate() {
       try {
          let label = await driver.findElement(By.xpath('//*[@id="currPrice"]')).getText();
          let label2 = await driver.findElement(By.xpath('')).getText();
          console.log(`${label} ${label2}`);

       } catch (err) {
           console.log(err);
       }
   }