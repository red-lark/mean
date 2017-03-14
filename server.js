process.env.NODE_ENV = process.env.NODE_ENV || "development";

const configureMongoose = require("./config/mongoose.js")
const configureExpress = require("./config/express.js");

const db = configureMongoose();
const app = configureExpress();
app.listen('3000');

module.exports = app;