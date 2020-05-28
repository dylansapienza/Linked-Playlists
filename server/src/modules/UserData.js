const mongoose = require("mongoose");

const spotifySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  spotify_id: String,
  username: String,
  password: String,
  email: String,
  fname: String,
  lname: String,
  access_token: String,
  refresh_token: String,
  playlists: [
    {
      playlist_id: String,
      ownership: Number,
      owner_id: String,
      playlist_name: String,
      playlist_description: String,
      playlist_cover: String,
    },
  ],
  friends: [String],
});

module.exports = mongoose.model("UserData", spotifySchema);
