const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  imageUrl: String,
  songUrl: String
});

const Playlist = mongoose.model('Playlist', PlaylistSchema);

module.exports = Playlist;
