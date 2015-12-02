var Artist = function(info){
  this.name = info.name;
  this.photoUrl = info.photoUrl;
  this.nationality = info.nationality;
  this.id = info.id;
};
Artist.all = []
Artist.fetch = function(){
  var url = "http://localhost:3000/artists";
  var request = $.getJSON(url).then(function(response){
    for(var i = 0; i < response.length; i++){
      Artist.all.push(new Artist(response[i]));
    }
  }).fail(function(response){
    console.log("js failed to load");
  });
  return request;
};

Artist.prototype = {
  fetchSongs: function(){
    var artist = this;
    var url = "http://localhost:3000/artists/" + artist.id + "/songs";
    artist.songs = [];
    var request = $.getJSON(url).then(function(response){
      for(var i = 0; i < response.length; i++){
        artist.songs.push(new Song(response[i]));
      }
    }).fail(function(repsonse){
      console.log("js failed to load");
    });
    return request;
  }
};
