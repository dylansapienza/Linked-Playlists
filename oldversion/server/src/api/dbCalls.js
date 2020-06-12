require("dotenv").config({ path: __dirname + "/./../../.env" });
const mongoose = require("mongoose");
const request = require("request");
const User = require("../modules/User");
const Playlist = require("../modules/Playlist");
const Recommendation = require("../modules/Recommendation");

//Initalize Mongoose Settings
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
//Need to incorperate env variables to hide
mongoose.connect(
  "mongodb://dylansap:spotifyapp@spotifyapp-shard-00-00-eey1y.mongodb.net:27017,spotifyapp-shard-00-01-eey1y.mongodb.net:27017,spotifyapp-shard-00-02-eey1y.mongodb.net:27017/test?ssl=true&replicaSet=spotifyapp-shard-0&authSource=admin&retryWrites=true&w=majority",
  { dbName: "spotifyapp" }
);

module.exports = {};
