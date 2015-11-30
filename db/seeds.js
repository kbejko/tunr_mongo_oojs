require("./schema");
var mongoose = require("mongoose");
var db = mongoose.connection;
var artistData = require("./artist_data");
var songData = require("./song_data");

db.on("error", function(err){
  console.log("Oops! Mongo threw an error. Is `mongod` running?");
  console.log(err.message);
  process.exit();
});

db.once("open", function(){
  console.log("Connected to the database.");
  var Artist = require("../models/artist");
  var Song = require("../models/song");

  Song.remove({}).then(function(){
    Artist.remove({}).then(function(){
      forEach(artistData, function(artistDatum){
        return new Artist(artistDatum).save().then(function(artist){
          return forEach(songData[artist.name], function(songDatum){
            song = new Song(songDatum);
            console.log(artist.name + " sings " + song.title);
            song.artist = artist;
            return song.save().then(function(song){
              artist.songs.push(song);
              artist.save();
            });
          })
        });
      }).then(function(){
        process.exit();
      });
    });
  });

});

function forEach(collection, callback, index){
  if(!index) index = 0;
  return callback(collection[index]).then(function(){
    if(collection[index + 1]) return forEach(collection, callback, index + 1);
  });
}
