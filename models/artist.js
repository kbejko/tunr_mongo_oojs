require("../db/schema");
var mongoose = require("mongoose");
var ArtistModel = mongoose.model("Artist");

module.exports = ArtistModel;
