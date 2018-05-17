const app = require('./utils/express.js');
const db = require('./utils/database');
const passport = require('./utils/auth')(db.User);
console.log("App started at " , new Date().toLocaleString());

//Init sessions
app.use(passport.initialize());
app.use(passport.session());

//Declare routes behaviors here
app.get('/',(req,res) => {
    res.render('base');
});

app.get('/login',(req,res) =>{
    console.log('login');
    res.render('login');
});

app.post('/login',
    passport.authenticate('local', {
        // If authentication succeeded, redirect to the home page
        successRedirect: '/',
        // If authentication failed, redirect to the login page
        failureRedirect: '/login'}
        )
);

//Launch server
app.listen(3500);