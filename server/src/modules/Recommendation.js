const mongoose = require("mongoose");

const spotifySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  track_id: String,
  playlist_id: String,
  host_id: String,
  friend_id: String,
  comment: String,
  rating: Number,
});

module.exports = mongoose.model("Recommendation", spotifySchema);
