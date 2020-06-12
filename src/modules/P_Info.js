const mongoose = require("mongoose");

const spotifySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  spotify_id: String,
  username: String,
  fname: String,
  lname: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("P_Info", spotifySchema);
