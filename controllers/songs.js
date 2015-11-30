var express = require("express");
var router = express.Router();
var Artist = require("../models/artist");
var Song = require("../models/song");

function error(response, message){
  response.status(500);
  response.json({error: message})
}

router.get("/songs", function(req, res){
  Song.find({}).populate("artist", "name").then(function(songs){
    res.json(songs);
  });
});

router.get("/songs/:id", function(req, res){
  Song.findById(req.params.id).populate("artist", "name").then(function(song){
    res.json(song);
  });
});

router.put("/songs/:id", function(req, res){
  Song.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).then(function(song){
    res.json(song);
  });
});

router.delete("/songs/:id", function(req, res){
  Song.findById(req.params.id).then(function(song){
    Artist.findByIdAndUpdate(song.artist._id, {
      $pull: { songs: {_id: req.params.id} }
    }).then(function(){
      return song.remove();
    }).then(function(){
      res.json({success: true});
    })
  });
});

module.exports = router;
