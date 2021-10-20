const cron = require('node-cron');
var moment = require('moment');
const config = {
    server: 'localhost:27017',
    database: 'BTCRSI',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};



// 0 00 06 * * ?
cron.schedule('*/1 * * * * * ', async () => {
    await migrate();
});
// migrate();
async function migrate() {
    try {
        console.log("lkjalsdkjlasd")


    } catch (err) {
        console.log(err);
    }
}