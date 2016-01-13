var Artist = function(info){
  this.name = info.name
  this.photoUrl = info.photoUrl
  this.nationality = info.nationality
  this.id = info.id
}

Artist.all = []
Artist.fetch = function(){
  var url = 'http://localhost:3000/artists'
  var request = $.getJSON(url).then(function(response){
    for (var i = 0; i < response.length; i++){
      Artist.all.push(new Artist(response[i]))
    }
  }).fail(function(response){
    console.log("artists fetch fail")
  })
  return request
}

Artist.prototype = {
  fetchSongs: function(){
    var artist = this
    var url = 'http://localhost:3000/artists/' + artist.id + '/songs'
    artist.songs = []
    var request = $.getJSON(url).then(function(response){
      for(var i = 0; i < response.length; i++){
        artist.songs.push(new Song(response[i]))
      }
    }).fail(function(response){
      console.log('js failed to load')
    })
    return request
  },
  update: function(artistData){
    var self = this
    var url = 'http://localhost:3000/artists/' + self.id
    var request = $.ajax({
      url: url,
      method: 'patch',
      data: JSON.stringify(artistData),
      contentType: 'application/json'
    }).then(function(updateArtistInfo){
      self.reload(updateArtistInfo)
    })
    return request
  },
  destroy: function(){
    var url = 'http://localhost:3000/artists/' + this.id
    var request = $.ajax({
      url: url,
      method: 'delete'
    })
    return request
  },
  reload: function(newData){
    for(var attrname in newData) {
      this[attrname] = newData[attrname]
    }
  }
}
