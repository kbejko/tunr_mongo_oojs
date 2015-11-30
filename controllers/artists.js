var express = require("express");
var router = express.Router();

function error(response, message){
  response.status(500);
  response.json({error: message})
}

router.get("/artists", function(req, res){
  res.render("artists index");
});

router.post("/artists", function(req, res){
  res.send("create artist");
});

router.get("/artists/:id", function(req, res){
  res.send("get artist " + req.params.id);
});

router.get("/artists/:id/songs", function(req, res){
  res.send("get artist " + req.params.id + "'s songs");
});

router.patch("/artists/:id", function(req, res){
  res.send("update artist " + req.params.id);
});

router.delete("/artists/:id", function(req, res){
  res.send("delete artist " + req.params.id);
});

module.exports = router;
