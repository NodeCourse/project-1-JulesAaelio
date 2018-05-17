module.exports = (app) => {
    //500
    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).render('errors/500');
    });

    //404
    app.use(function (req, res, next) {
        res.status(404).render('errors/404');
    });
    return app;
};