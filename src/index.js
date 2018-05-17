const app = require('./utils/express.js');
const db = require('./utils/database');
const passport = require('./utils/auth')(db.User);
console.log("App started at " , new Date().toLocaleString());

//Init sessions
app.use(passport.initialize());
app.use(passport.session());

//Declare routes behaviors here
app.use('/',(req,res) => {
    res.render('base');
});


//Launch server
app.listen(3500);