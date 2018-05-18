module.exports = (app) => {
    app.use(function(req, res, next) {
        console.log(req.url);
        if(req.user) {
            console.log("got user");
            res.locals.user = req.user;
            next();
        }else if (req.url.match('/login') === null && req.url.match('/register') === null){
            res.redirect('/login?redirectTo='+req.url);
        }else {
            next()
        }
    });

    app.get('/',(req,res) => {
        res.redirect('/user');
    });


};

