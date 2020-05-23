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
  playlists: [String],
  friends: [String],
});

module.exports = mongoose.model("UserData", spotifySchema);
