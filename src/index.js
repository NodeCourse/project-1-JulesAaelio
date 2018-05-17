const app = require('./utils/express.js');
const db = require('./utils/database');
const auth = require('./utils/auth');
const passport = require('./utils/auth').passport(db.User);

console.log("App started at " , new Date().toLocaleString());

//Init sessions
app.use(passport.initialize());
app.use(passport.session());

//Declare routes behaviors here
app.get('/',(req,res) => {
    res.render('base',{
        user : req.user
    });
});

app.get('/login',(req,res) =>{
    console.log('login');
    res.render('login');
});

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
    })
);

app.get('/add',(req,res) => {
   res.render('survey_form');
});

app.post('/register',auth.register(db.User));

//Launch server
app.listen(3500);