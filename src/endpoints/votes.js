module.exports = (app,db) => {
    const surveyusage = require('./survey-usage')(app,db);
    app.post('/survey/:survey/vote/:answer',(req,res) => {
            db.Answer.find({
                where: {
                    id: req.params.answer,
                    surveyId: req.params.survey
                }
            }).then(answer => {
                if (!answer) {
                    req.next(new Error('Réponse inexistante'));
                } else {
                    surveyusage.getExistingAnswer(req.params.survey,req.user.id).then(answers => {
                        if(answers.length > 0) {
                            console.log('DEJA REPONDU');
                        }else {
                            db.Vote.create({
                                answerId: answer.id,
                                userId : req.user.id
                            }).then(r => {
                                res.redirect('/survey/'+req.params.survey)
                            })
                        }
                    });
                }
            })
        });
};