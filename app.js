const cron = require('node-cron');
var moment = require('moment');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/BTCRSI";  

const {Builder,By} = require("selenium-webdriver");
// const config = {
//     server: 'localhost:27017',
//     database: 'BTCRSI',
//     options: {
//         encrypt: true,
//         trustServerCertificate: true
//     }
// };
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
const crontime = (waitTimeInMs) => new Promise(resolve => setTimeout(run, waitTimeInMs));
var a = false
let driver = new Builder().forBrowser("chrome").build();
driver.get("https://www.gate.io/en/trade/BTC_USDT");




//zsdzsd();
crontime(5000);
// async function zsdzsd(){
// await sleep(20000);
// var elems = await driver.findElements(By.css("#kline_tradingView_Indicator_box > li"));
// if(elems.length == 51){
//     elems[6].click();
//      a = true;
// }
// else{
//     a = false;
// }
// }

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "INSERT INTO BTCandRSI (name, address) VALUES ('Company Inc', 'Highway 37')";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("1 record inserted");
//     });
//   });

// 0 00 06 * * ?
async function run (){

    cron.schedule('*/1 * * * * * ', async () => {
        await migrate();
    });
}
   async function migrate() {
       try {
        //  let label2 = await driver.findElement(By.id('pane-legend-item-value pane-legend-line')).getText();
     
          let label = await driver.findElement(By.xpath('//*[@id="currPrice"]')).getText();
          await sleep(2000);
          
          let label2 = await driver.findElement(By.xpath('//*[@id="ticker_vol_b"]')).getText();
          MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("BTCRSI");
            var myobj = { BtcPrice: label, Volume: label2 };
            dbo.collection("BTCandRSI").insertOne(myobj, function(err, res) {
              if (err) throw err;
              console.log("1 document inserted");
              db.close();
            });
          });
        //  let x =  0;
            console.log(`${label} ${label2}`);
        

       } catch (err) {
           console.log(err);
       }
   }