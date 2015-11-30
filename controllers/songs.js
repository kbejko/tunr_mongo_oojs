var express = require("express");
var router = express.Router();

function error(response, message){
  response.status(500);
  response.json({error: message})
}

router.get("/songs", function(req, res){
  res.send("songs index");
});

router.post("/songs", function(req, res){
  res.send("create song");
});

router.get("/songs/:id", function(req, res){
  res.send("get song " + req.params.id);
});

router.patch("/songs/:id", function(req, res){
  res.send("update song " + req.params.id);
});

router.delete("/songs/:id", function(req, res){
  res.send("delete song " + req.params.id);
});

module.exports = router;
