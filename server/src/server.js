require("dotenv").config({ path: __dirname + "/./../.env" });
const mongoose = require("mongoose");
var express = require("express"); // Express web server framework
var request = require("request"); // "Request" library
var cors = require("cors");
var querystring = require("querystring");
var cookieParser = require("cookie-parser");
const User = require("./modules/User");
const Playlist = require("./modules/Playlist");
const apiCalls = require("./api/apicalls");

//Need to add flags to avoid deprication MONGODB
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(
  "mongodb+srv://dylansap:spotifyapp@spotifyapp-eey1y.mongodb.net/test?retryWrites=true&w=majority",
  { dbName: "spotifyapp" }
);

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
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: body.display_name,
            access_token: access_token,
            refresh_token: refresh_token,
            id: body.id,
            email: body.email,
          });
          user.save().then((result) => {
            console.log(result);
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
  const queryemail = req.body.email;
  //const passkey = req.body.passkey; For Future Auth
  const output = await apiCalls.createPlaylist(queryemail);

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

  const output = await apiCalls.addSongToPlaylist(
    song_id,
    host_id,
    friend_id,
    comment,
    rating
  );

  console.log(output);

  res.send(output);
});

app.get("/testAPI", (req, res) => {
  res.send("API is working properly");
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
