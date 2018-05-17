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

app.post('/register',auth.register(db.User));

app.get('/add',(req,res) => {
   res.render('survey_form');
});

app.get('/survey/:id',(req,res) =>{
    if(req.params.id){
        db.Survey.findById(req.params.id,{
            include : [
                {all:true}
            ]
        }).then(survey => {
            if(survey) {
                res.render('survey', {
                    survey
                })
            }else {
                req.next();
            }
        })
    }
});

app.post('/add',(req,res) =>{
    console.log("add post ");
    if(req.body && req.body.question ){
        let answers = [];
        let index = 1;
        let answer;
        while((answer = req.body['answer-'+index])){
            console.log(answer);
            answers.push({
                label: answer
            });
            index++;
        }
        console.log(answers);
        db.Survey.create({
            question : req.body.question,
            answers: answers
        },{
            include: [db.Answer]
        });
    }else {
        console.log('no body')
    }
});

//500
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).render('errors/500');
});

//404
app.use(function (req, res, next) {
    res.status(404).render('errors/404');
});

//Launch server
app.listen(3500);