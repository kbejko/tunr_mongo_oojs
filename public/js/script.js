$(document).ready(function(){
  Artist.fetch().then(function(artists){
    Artist.all.forEach(function(artist){
      var view = new ArtistView(artist)
      view.render();
    })
  })
});
