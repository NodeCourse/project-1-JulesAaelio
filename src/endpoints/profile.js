module.exports = (app,db) => {
  app.use('/user',(req,res) => {
      db.Survey.findAll({
          where: {
              userId : req.user.id
          },
          include : [
              {
                  model : db.Answer
              }
          ]
      }).then((surveys) => {
          res.render('profile', {
              surveys
          });
      });
  });

    app.use('/all',(req,res) => {
        db.Survey.findAll({
            include : [
                {
                    model : db.Answer
                }
            ]
        }).then((surveys) => {
            res.render('profile', {
                surveys
            });
        });
    });
  return app;
};