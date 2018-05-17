const sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const db = new sequelize('nodetest','datauser','toto',{
    host: 'localhost',
    dialect: 'mysql'
});
db.authenticate().then((r) => {
    console.log("[DATABASE] Connection established");
}).catch(e => {
    console.error(e);
});

const Survey = db.define('survey',{
   question: sequelize.STRING,
});

const User = db.define('user', {
    firstname : { type: sequelize.STRING } ,
    lastname : { type: sequelize.STRING } ,
    email : { type: sequelize.STRING } ,
    password : { type: sequelize.STRING }
});

const Answer = db.define('answer', {
   label : sequelize.STRING,
});

const Vote = db.define('vote',{});


//Relationships

Survey.hasMany(Answer);
Answer.belongsTo(Survey);

Survey.belongsTo(User);
User.hasMany(Survey);

User.hasMany(Vote);
Vote.belongsTo(User);

Answer.hasMany(Vote);
Vote.belongsTo(Answer);


// Sync database
db.sync().then((r)=> {
    console.log("[DATABASE] Database synchronised");
}).catch(e => {
    console.error(e);
});

module.exports.sequelize = db;
module.exports.Survey = Survey;
module.exports.User = User;
module.exports.Answer = Answer;
module.exports.Vote = Vote;