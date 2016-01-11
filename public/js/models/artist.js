var Artist = function(info){
  this.name = info.name
  this.photoUrl = info.photoUrl
  this.nationality = info.nationality
  this.id = info.id
}

Artist.fetch = function(){
  // saving ajax request to local variable
  // the promise function on a successful ajax call
  var request = $.getJSON('http://localhost:3000/artists').then(function(response){
    // local variable in the promise callback instantiated as an empty array
    var artists = []
    // loop over each element in the response
    for(var i = 0; i < response.length; i++){
      // create a new JS Artist object for each element in the response
      artists.push(new Artist(response[i]))
    }
    // returns artists in the promise so that it can be passed in as an argument to future promises
    return artists
  }).fail(function(response){
    console.log("artists fetch fail")
  })
  // explicit return of the fetch function that returns the json request with artist available as argument for future promises
  return request
}

Artist.prototype.fetchSongs = function(){
  var url = 'http://localhost:3000/artists/' + this.id + '/songs'
  var request = $.getJSON(url).then(function(response){
    var songs = []
    for(var i = 0; i < response.length; i++){
      songs.push(new Song(response[i]))
    }
    return songs
  }).fail(function(response){
    console.log('js failed to load')
  })
  return request
}
