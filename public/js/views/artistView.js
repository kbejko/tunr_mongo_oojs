var ArtistView = function(artist){
  this.artist = artist
  this.$el = $('<div class="artist"></div>')
  this.render()
    $('.artists').append(this.$el)
}

ArtistView.prototype = {
  render: function(){
    var self = this
    self.$el.html(self.artistTemplate(self.artist))
    var showButton = self.$el.find('.showSongs')
    var songsDiv = self.$el.find('div.songs')
    songsDiv.hide()
    showButton.on('click', function(){
      self.toggleSongs(songsDiv)
    })
  },
  toggleButton: function(songsDiv){
    if(songsDiv.is(':visible')){
      songsDiv.siblings('button.showSongs').text('Hide Songs')
    } else {
      songsDiv.siblings('button.showSongs').text('Show Songs')
    }
  },
  toggleSongs: function(songsDiv){
    var self = this
    if(songsDiv.children().length === 0){
      self.artist.fetchSongs().then(function(songs){
        self.appendSongs(songs, songsDiv)
        songsDiv.show()
      })
    }
    songsDiv.toggle()
    self.toggleButton(songsDiv)
  },
  appendSongs: function(songs, songsDiv){
    songs.forEach(function(song){
      var songView = new SongView(song)
      songsDiv.append(songView.render())
    })
  },
  artistTemplate: function(artist){
    var html = $('<div>')
    html.append('<h3>' + this.artist.name + '</h3>')
    html.append('<img class="artist-photo" src="' + this.artist.photoUrl + '">')
    html.append('<button class="showSongs">Show Songs</button>')
    html.append('<div class="songs"></div>')
    return(html)
  }
}
