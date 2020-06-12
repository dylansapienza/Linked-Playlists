const mongoose = require("mongoose");

const spotifySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  playlist_id: String,
  id: String,
  email: String,
});

module.exports = mongoose.model("Playlist", spotifySchema);
