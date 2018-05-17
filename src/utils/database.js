const sequelize = require('sequelize');
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


// Sync database
db.sync().then((r)=> {
    console.log("[DATABASE] Database synchronised");
}).catch(e => {
    console.error(e);
});

module.exports.sequelize = db;
module.exports.Survey = Survey;
module.exports.User = User;