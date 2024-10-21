const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    title: { type: String, required: true },
    mood: { type: String, required: true },
    songs: [{ type: String }], // List of song URLs
});

module.exports = mongoose.model('Playlist', playlistSchema);

