const config = require("./config");
const mongoose = require("mongoose");

module.exports = function(){
    
    mongoose.connect(config.db);
    const  db = mongoose.connection;
    
    db.once('open', () => {
        console.log("DB connected...");
    });
    
    require('../app/models/user.server.model.js');
    return db;
}