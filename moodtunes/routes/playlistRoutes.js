const express = require('express');
const { getPlaylistsByMood } = require('../controllers/playlistController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/mood/:mood', verifyToken, getPlaylistsByMood);

module.exports = router;

