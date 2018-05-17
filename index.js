const app = require('./express.js');
console.log("App started at " , new Date().toLocaleString());

app.use('/',(req,res) => {
    res.render('base');
});

app.listen(3500);