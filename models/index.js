const dbConfig = require('../config/config.js');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.book = require("./Book.js")(mongoose);

module.exports = db;