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
 
let driver = new Builder().forBrowser("chrome").build();

driver.get('https://www.gate.io/en/trade/BTC_USDT');

driver.sleep(20000);


driver.findElement(By.xpath("//*[@id=\"kline_tradingView_Indicator_box\"]/li[7]")).click();


// 0 00 06 * * ?
 cron.schedule('*/1 * * * * * ', async () => {
     await migrate();
 });
// // migrate();
 async function migrate() {
     try {
        const label = await driver.findElement(By.xpath('//*[@id="currPrice"]')).getText();
     //   const label2 = await driver.findElement(By.xpath('/html/body/div[1]/div[1]/div/div[2]/table/tbody/tr[5]/td[2]/div/div[3]/div/div/span[1]/span')).getText();
       // JSON.parse(label);
        console.log(label);
      //  console.log(label2);

     } catch (err) {
         console.log(err);
     }
 }