module.exports = (app, db) => {
    app.get('/survey/:id', (req, res) => {
        if (req.params.id) {
            if (req.user) {
                getSurvey(req.params.id).then(survey => {
                    if (survey) {
                        getExistingAnswer(survey.id, req.user.id).then((answers) => {
                            const alreadyAnswered = (answers.length > 0);
                            calculateRatios(survey.answers);
                            res.render('survey', {
                                survey,
                                alreadyAnswered
                            })
                        })
                    } else {
                        req.next();
                    }
                })
            } else {
                res.redirect('/login?redirectTo=' + req.url);
            }
        }
    });

    function getExistingAnswer(surveyId, userId) {
        return db.Vote.findAll({
            where: {
                userId: userId
            },
            include: [
                {
                    model: db.Answer,
                    include: [
                        db.Survey
                    ],
                    where: {
                        surveyId: parseInt(surveyId)
                    }
                }
            ]
        })
    }

    function getSurvey(id) {
        return db.Survey.findById(id, {
            include: [
                {
                    model: db.Answer,
                    include: [
                        db.Vote
                    ]
                }
            ]
        })
    }

    function calculateRatios(answers) {
        let totalAnswer = 0;
        answers.forEach((o) => {
            totalAnswer += o.votes.length;
        });
        if (totalAnswer === 0) totalAnswer = 1;
        answers.forEach((o) => {
            o.ratio = (o.votes.length * 100) / totalAnswer;
            console.log(o.votes.length);
            console.log(totalAnswer);
        });
    }


    return {
        app,
        getExistingAnswer
    };
};