module.exports = (app, db) => {
    app.get('/survey/:id', (req, res) => {
        if (req.params.id) {
            if (req.user) {
                db.Survey.findById(req.params.id, {
                    include: [
                        {
                            model : db.Answer,
                            include : [
                                db.Vote
                            ]
                        }
                    ]
                }).then(survey => {
                    if (survey) {
                         // res.send(survey);
                        let totalAnswer = 0;
                        survey.answers.forEach((o) => {
                           totalAnswer += o.votes.length;
                        });
                        if(totalAnswer === 0) totalAnswer = 1;
                        survey.answers.forEach((o) => {
                            o.ratio = (o.votes.length * 100)/totalAnswer;
                            console.log(o.votes.length);
                            console.log(totalAnswer);
                        });
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