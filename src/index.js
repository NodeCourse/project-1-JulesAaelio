const app = require('./utils/express.js');
console.log("App started at " , new Date().toLocaleString());

app.use('/',(req,res) => {
    res.render('base');
});
console.log('test 2445');
app.listen(3500);