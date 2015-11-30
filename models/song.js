require("../db/schema");
var mongoose = require("mongoose");
var SongModel = mongoose.model("Song");

module.exports = SongModel;
