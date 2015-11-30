var express = require("express");
var router = express.Router();
var Artist = require("../models/artist");
var Song = require("../models/song");

function error(response, message){
  response.status(500);
  response.json({error: message})
}

router.get("/", function(req, res){
  Artist.find({}).populate("songs").then(function(artists){
    res.json(artists);
  });
});

router.post("/", function(req, res){
  new Artist(req.body).save().then(function(artist){
    res.json(artist);
  });
});

router.get("/:id", function(req, res){
  Artist.findById(req.params.id).populate("songs").then(function(artist){
    res.json(artist);
  });
});

router.get("/:id/songs", function(req, res){
  Artist.findById(req.params.id).populate("songs").then(function(artist){
    res.json(artist.songs);
  });
});

router.patch("/:id", function(req, res){
  console.log(req.body)
  Artist.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).then(function(artist){
    res.json(artist);
  })
});

router.delete("/:id", function(req, res){
  Artist.findByIdAndRemove(req.params.id).then(function(){
    res.json({success: true});
  });
});

module.exports = router;
