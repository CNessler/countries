var mongoose = require("mongoose");

var countrySchema = new mongoose.Schema({
                   country: String,
                   flag: String,
                   capital: String,
                   population: Number
                  });


var Country = mongoose.model("Country", countrySchema);

module.exports = Country;
