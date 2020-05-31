require("dotenv").config({ path: __dirname + "/./../.env" });
const mongoose = require("mongoose");
var express = require("express"); // Express web server framework
var request = require("request"); // "Request" library
var cors = require("cors");
var querystring = require("querystring");
var cookieParser = require("cookie-parser");
const User = require("./modules/User");
const Playlist = require("./modules/Playlist");
const P_Info = require("./modules/P_Info");
const UserData = require("./modules/UserData");
const bcrypt = require("bcrypt");
const apiCalls = require("./api/apicalls");

//Need to add flags to avoid deprication MONGODB
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect(
  "mongodb://dylansap:spotifyapp@spotifyapp-shard-00-00-eey1y.mongodb.net:27017,spotifyapp-shard-00-01-eey1y.mongodb.net:27017,spotifyapp-shard-00-02-eey1y.mongodb.net:27017/test?ssl=true&replicaSet=spotifyapp-shard-0&authSource=admin&retryWrites=true&w=majority",
  { dbName: "spotifyapp" }
);

console.log(mongoose.connection.readyState);

var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your secret
var redirect_uri = "http://localhost:8888/callback"; // Your redirect uri
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = "spotify_auth_state";

var app = express();

app
  .use(express.static(__dirname + "\\../public"))
  .use(cors())
  .use(cookieParser())
  .use(express.json());

app.get("/login", function (req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = "user-read-private user-read-email playlist-modify-public";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

app.get("/callback", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;
        console.log(body);

        var options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        request.get(options, function (error, response, body) {
          console.log(body);

          //Mongoose
          // const user = new User({
          //   _id: new mongoose.Types.ObjectId(),
          //   name: body.display_name,
          //   access_token: access_token,
          //   refresh_token: refresh_token,
          //   id: body.id,
          //   email: body.email,
          // });
          // user.save().then((result) => {
          //   console.log(result);
          // });

          var pp_data;

          if (body.images[0]) {
            pp_data = body.images[0].url;
          } else {
            pp_data = "";
          }

          const userdata = new UserData({
            _id: new mongoose.Types.ObjectId(),
            spotify_id: body.id,
            profile_picture: pp_data,
            username: "",
            password: "",
            email: "",
            fname: "",
            lname: "",
            access_token: access_token,
            refresh_token: refresh_token,
            email: body.email,
            playlists: [],
            friends: [],
          });
          userdata.save(function (err) {
            if (err) return console.log(err);
          });

          // we can also pass the token to the browser to make requests from there
          res.redirect(
            "http://localhost:3000/accountinfo?" +
              querystring.stringify({
                id: body.id,
              })
          );
        });
      } else {
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
});

app.post("/api/playlist/", async (req, res) => {
  const doc_id = req.body.token;
  const playlist_name = req.body.p_name;
  const playlist_description = req.body.p_desc;

  console.log(doc_id, playlist_name);
  //const passkey = req.body.passkey; For Future Auth

  const output = await apiCalls.createPlaylist(
    doc_id,
    playlist_name,
    playlist_description
  );

  console.log(output);

  res.send(output);
});

// app.get("/api/playlist/:email", async function (req, res) {
//   const queryemail = req.params.email;

//   const output = await apiCalls.createPlaylist(queryemail);

//   console.log(output);

//   res.send(output);
// });

//Should probably send through a post request
app.post("/api/recommendation/", async function (req, res) {
  const host_id = req.body.host_id;
  const friend_id = req.body.friend_id;
  const comment = req.body.comment;
  const rating = req.body.rating;
  const song_id = req.body.song_id;
  const playlist_id = req.body.playlist_id;

  console.log(mongoose.connection.readyState);
  const output = await apiCalls.addSongToPlaylist(
    song_id,
    host_id,
    friend_id,
    playlist_id,
    comment,
    rating
  );

  console.log(output);

  res.send(output);
});

app.post("/accountcreation", async (req, res) => {
  //const p_info = JSON.parse(req.body);
  console.log(req.body);
  //req.body.spotify_id!
  const password = req.body.password;

  const hash = await bcrypt.hash(password, 10);

  UserData.findOneAndUpdate(
    { spotify_id: req.body.spotify_id },
    {
      username: req.body.username,
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: hash,
    }
  ).exec(function (err, userdata) {
    if (err) console.log(err);
    else {
      console.log(userdata);
      res.send("http://localhost:3000/login?n=y");
    }
  });

  // const p_info = new P_Info({
  //   _id: new mongoose.Types.ObjectId(),
  //   spotify_id: req.body.spotify_id,
  //   username: req.body.username,
  //   fname: req.body.fname,
  //   lname: req.body.lname,
  //   email: req.body.email,
  //   password: hash,
  // });
  // p_info.save().then((result) => {
  //   console.log(result);
  //   res.send("http://localhost:3000/login?n=y");
  // });
});

app.post("/login", async (req, res) => {
  UserData.findOne({ username: req.body.username })
    .exec()
    .then(async (doc) => {
      console.log(doc);
      const query_hash = doc.password;

      const isLoggedIn = await bcrypt.compare(req.body.password, query_hash);
      console.log(isLoggedIn);
      if (isLoggedIn) {
        //Valid!
        //Respond with Login Session w/ Username
        //Redirect to homepage
        //Using Document.id as login cookie, should probably change this to something more secure
        res.send(doc.id);
      } else {
        //Invalid
        //try again
      }
    });
});

app.post("/api/getPlaylists", async (req, res) => {
  var user_token;
  var playlistInfo = [];
  var p_data;
  var refresh_token;
  var access_token;
  var doc_id;

  if (req.body.username) {
    var username = req.body.username;
    console.log("USERNAME CALL:", username);
    await UserData.findOne({ username: username }, async function (
      err,
      userinfo
    ) {
      user_token = userinfo._id;
      console.log("USER TOKEN RECEIVED: ", user_token);
      await UserData.findById(user_token, async function (err, userdata) {
        p_data = userdata.playlists;
        refresh_token = userdata.refresh_token;
        access_token = userdata.access_token;
        doc_id = userdata._id;
        //console.log(refresh_token);
      });

      if (!p_data) {
        console.log("NULL ERROR");
      } else {
        var playlists = Array(Object.keys(p_data)).fill(0);
      }

      //console.log(p_data);
      //console.log(Object.keys(p_data).length);

      //var playlists = Array(Object.keys(p_data)).fill(0);

      for (let i = 0; i < Object.keys(p_data).length; i++) {
        //console.log(i, ":", JSON.parse(JSON.stringify(p_data[i].playlist_id)));
        let p = JSON.parse(JSON.stringify(p_data[i]));
        playlists[i] = await apiCalls.getPlaylistInfo(
          doc_id,
          p.playlist_id,
          p.ownership,
          access_token,
          refresh_token
        );
      }

      //console.log(playlists);
      res.send(playlists);
    });
  } else {
    user_token = req.body.user_token;
  }
  //Query Cookie ID
  //console.log(user_token);

  console.log("UserTOKEN:" + user_token);

  await UserData.findById(user_token, async function (err, userdata) {
    p_data = userdata.playlists;
    refresh_token = userdata.refresh_token;
    access_token = userdata.access_token;
    doc_id = userdata._id;
    //console.log(refresh_token);
  });

  if (!p_data) {
    console.log("NULL ERROR");
  } else {
    var playlists = Array(Object.keys(p_data)).fill(0);
  }

  //console.log(p_data);
  //console.log(Object.keys(p_data).length);

  //var playlists = Array(Object.keys(p_data)).fill(0);

  for (let i = 0; i < Object.keys(p_data).length; i++) {
    //console.log(i, ":", JSON.parse(JSON.stringify(p_data[i].playlist_id)));
    let p = JSON.parse(JSON.stringify(p_data[i]));
    playlists[i] = await apiCalls.getPlaylistInfo(
      doc_id,
      p.playlist_id,
      p.ownership,
      access_token,
      refresh_token
    );
  }

  //console.log(playlists);
  res.send(playlists);

  //console.log(playlistInfo);

  //Return Playlist ID's to Update
  //API Call to Spotify for Info

  //Spotify Call Update The Data In DB

  //Return Array of Objects
  // Playlist Title
  // Image Link
  // Description

  //Return Track INFO? NO THANKS
});

app.post("/api/getTracks", async function (req, res) {
  var user_token;
  if (req.body.username) {
    var username = req.body.username;
    await UserData.findOne({ spotify_id: username }, async function (
      err,
      userinfo
    ) {
      user_token = userinfo._id;
    });
  } else {
    user_token = req.body.user_token;
  }

  const playlist_id = req.body.playlist_id;

  //console.log(playlist_id, user_token);

  var tracks = await apiCalls.getTracks(playlist_id, user_token);

  //console.log(tracks);

  res.send(tracks);
});

app.post("/api/users", async function (req, res) {
  const searchquery = req.body.searchquery;

  UserData.find(
    { username: { $regex: ".*" + searchquery + ".*", $options: "i" } },
    { _id: 0, password: 0, access_token: 0, refresh_token: 0, spotify_id: 0 },
    function (err, users) {
      if (err) console.log(err);
      else {
        res.send(users);
      }
    }
  );
});

app.post("/api/friendrequest", async function (req, res) {
  //Sender ID will allow us to use their token_id
  const sender_id = req.body.user_token;
  //For Reciever We will need to use a findOne query
  const reciever_id = req.body.username;

  let doc = await UserData.findOneAndUpdate(
    { _id: sender_id },
    { friend_id: reciever_id, status: 2 }
  );

  UserData.findOneAndUpdate(
    { username: reciever_id },
    { friend_id: doc.username, status: 0 }
  );

  res.send("Success!");
});

app.post("/api/frienddecline", async function (req, res) {});

app.post("/api/friendaccept", async function (req, res) {
  const user_id = req.body.user_token;
  const friend = req.body.username;

  let doc = await UserData.findOneAndUpdate(
    { _id: user_id, friend_id: friend },
    { status: 1 }
  );

  UserData.findOneAndUpdate(
    { username: friend, friend_id: doc.username },
    { status: 1 }
  );

  res.send("Success!");
});

app.get("/refresh_token", function (req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
});

console.log("Listening on 8888");
app.listen(8888);
