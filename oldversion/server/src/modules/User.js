const mongoose = require("mongoose");

const spotifySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  access_token: String,
  refresh_token: String,
  id: String,
  email: String,
});

module.exports = mongoose.model("User", spotifySchema);
