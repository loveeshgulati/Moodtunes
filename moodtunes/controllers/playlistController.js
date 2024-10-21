const Playlist = require('../models/playlistModel');

exports.getPlaylistsByMood = async (req, res) => {
    const { mood } = req.params;
    try {
        const playlists = await Playlist.find({ mood });
        res.json(playlists);
    } catch (err) {
        res.status(400).json({ message: 'Error fetching playlists' });
    }
};

