const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require("./models/userModel");  // User model for auth
const Playlist = require("./models/playlistModel");  // Playlist model
const path = require("path");
const cors = require('cors');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const bodyParser = require("body-parser");
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

// Mongoose connection
main()
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/MoodTune');
}

// -----------------------------------------------SIGNUP ROUTE---------------------------------------------------

app.get("/moodtune/signup", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.post("/moodtune/signup", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already registered");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    let newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    // Create a JWT token
    let token = jwt.sign({ email: email }, "MY_SECRET_KEY");

    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
    });

    return res.sendFile(path.join(__dirname, "public", "index.html"));
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
});

// ----------------------------------------------LOGIN ROUTE---------------------------------------------------

app.get("/moodtune/login", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post("/moodtune/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('User not found');
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ email: email }, "MY_SECRET_KEY");
      res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      return res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else {
      return res.status(401).send('Invalid password');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('An error occurred');
  }
});

// ---------------------------------START ROUTE---------------------------------------------------------------------

app.get("/moodtune", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ---------------------------------PLAYLIST ROUTES---------------------------------------------------------------

// Middleware to verify token and ensure the user is authenticated
function authenticate(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  
  try {
    const decoded = jwt.verify(token, "MY_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send('Invalid token');
  }
}

// GET all songs in the playlist
app.get("/moodtune/playlist", authenticate, async (req, res) => {
  try {
    const playlist = await Playlist.find();
    res.json(playlist);
  } catch (err) {
    res.status(500).send('Error retrieving playlist');
  }
});

// POST a new song to the playlist
app.post("/moodtune/playlist", authenticate, async (req, res) => {
  const { title, artist, album, imageUrl, songUrl } = req.body;
  
  try {
    const newSong = new Playlist({
      title,
      artist,
      album,
      imageUrl,
      songUrl
    });

    await newSong.save();
    res.status(201).send(newSong);
  } catch (err) {
    res.status(500).send('Error adding song to playlist');
  }
});

// DELETE a song from the playlist by ID
app.delete("/moodtune/playlist/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSong = await Playlist.findByIdAndDelete(id);
    if (!deletedSong) {
      return res.status(404).send('Song not found');
    }
    res.status(200).send('Song deleted successfully');
  } catch (err) {
    res.status(500).send('Error deleting song');
  }
});

// ---------------------------------Playlist Model---------------------------------------------------
// Playlist Schema
const PlaylistSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  imageUrl: String,
  songUrl: String
});

 
// Playlist model
// const Playlist = mongoose.model('Playlist', PlaylistSchema);

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
