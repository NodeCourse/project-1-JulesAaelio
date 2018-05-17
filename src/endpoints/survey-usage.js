module.exports = (app,db) => {
    app.get('/survey/:id',(req,res) =>{
        if(req.params.id){
            db.Survey.findById(req.params.id,{
                include : [
                    {all:true}
                ]
            }).then(survey => {
                if(survey) {
                    res.render('survey', {
                        survey
                    })
                }else {
                    req.next();
                }
            })
        }
    });
    return app;
};