module.exports = (app,db) => {
    app.post('/survey/:survey/vote/:answer',(req,res) => {
        if(req.user) {
            db.Answer.find({
                where: {
                    id: req.params.answer,
                    surveyId: req.params.survey
                }
            }).then(r => {
                if (!r) {
                    req.next();
                } else {
                    db.Vote.create({
                        answerId: r.id,
                        userId : req.user.id
                    }).then(r => {
                        res.send(r);
                    })
                }
            })
        }else {
            res.redirect('/login');
        }
    });
};