module.exports  = (app,auth, passport, db) => {
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
    return app;
};