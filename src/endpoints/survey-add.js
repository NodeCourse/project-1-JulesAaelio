module.exports = (app,db) => {
    app.get('/add',(req,res) => {
        res.render('survey_form');
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
    return app;
};