module.exports = (app, db) => {
    app.get('/survey/:id', (req, res) => {
        if (req.params.id) {
            if (req.user) {

                db.Survey.findById(req.params.id, {
                    include: [
                        {all: true}
                    ]
                }).then(survey => {
                    if (survey) {
                        res.render('survey', {
                            survey
                        })
                    } else {
                        req.next();
                    }
                })
            }else{
                res.redirect('/login?redirectTo='+req.url);
            }

        }
    });
    return app;
};