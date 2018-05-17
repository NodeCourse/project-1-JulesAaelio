module.exports  = (app,auth, passport, db) => {

    app.get('/login',(req,res) =>{
        console.log('login');
        res.render('login',{
            redirectTo : req.query.redirectTo
        });
    });

    app.post('/login',(req,res) => {
        console.log(req.params);
            passport.authenticate('local', {
                successRedirect: req.query.redirectTo || '/',
                failureRedirect: '/login',
            })(req, res);
        }
    );
    app.post('/register',auth.register(db.User));
    return app;
};