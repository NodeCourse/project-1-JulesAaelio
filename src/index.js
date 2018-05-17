const app = require('./utils/express.js');
const db = require('./utils/database');
console.log("App started at " , new Date().toLocaleString());

app.use('/',(req,res) => {
    res.render('base');
});

app.listen(3500);