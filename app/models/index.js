const mongoose = require('mongoose');
const dbConfig = require("../../config/db.config.js");

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

const db = {}
db.mongoose = mongoose;
db.url = dbConfig.url; 
db.products = require("./product.model.js")(mongoose)
db.orders = require("./order.model.js")(mongoose)

module.exports = db