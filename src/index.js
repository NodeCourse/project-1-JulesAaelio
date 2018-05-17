const app = require('./utils/express.js');
const db = require('./utils/database');
const auth = require('./utils/auth');
const passport = require('./utils/auth').passport(db.User);

console.log("App started at " , new Date().toLocaleString());

//Init sessions
app.use(passport.initialize());
app.use(passport.session());

//Declare routes behaviors here
require('./endpoints/default')(app);
require('./endpoints/login.js')(app,auth,passport,db);
require('./endpoints/survey-add')(app,db);
require('./endpoints/survey-usage')(app,db);
require('./endpoints/errors')(app);

//Launch server
app.listen(3500);