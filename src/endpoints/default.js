module.exports = (app) => {
    app.get('/',(req,res) => {
        res.render('survey_form',{
            user : req.user
        });
    });
};