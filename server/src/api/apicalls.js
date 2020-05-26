/*
    The home for all Spotify API Calls Defined
*/

//Required Modules
require("dotenv").config({ path: __dirname + "/./../../.env" });
const mongoose = require("mongoose");
const request = require("request");
const User = require("../modules/User");
const Playlist = require("../modules/Playlist");
const Recommendation = require("../modules/Recommendation");
const UserData = require("../modules/UserData");

//Initalize Mongoose Settings
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
//Need to incorperate env variables to hide
mongoose.connect(
  "mongodb://dylansap:spotifyapp@spotifyapp-shard-00-00-eey1y.mongodb.net:27017,spotifyapp-shard-00-01-eey1y.mongodb.net:27017,spotifyapp-shard-00-02-eey1y.mongodb.net:27017/test?ssl=true&replicaSet=spotifyapp-shard-0&authSource=admin&retryWrites=true&w=majority",
  { dbName: "spotifyapp" }
);

//Entering Exported Functions

module.exports = {
  createPlaylist: async function createPlaylist(query_id, p_name, p_desc) {
    //Promise Allows the Use of Async/Await
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //Find User Based Upon their doc_id
        console.log(query_id);
        UserData.findById(query_id)
          .exec()
          .then((doc) => {
            console.log(doc);
            const query_userid = doc.spotify_id;
            const query_token = doc.access_token;
            const query_name = doc.fname;
            const query_refresh = doc.refresh_token;
            if (p_name === "") {
              const playlist_name =
                "🚀 " + query_name + "'s Recommended Playlist";
            } else {
              playlist_name = p_name;
            }
            if (p_desc === "") {
              const playlist_description =
                "Auto-Generated 🚀 By SpotifyPlaylistApp";
            }
            playlist_description = p_desc + "🚀 By SpotifyPlaylist App";

            //Create New Playlist POST Request

            var headers = {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + query_token,
            };

            var dataString =
              '{"name":"' +
              playlist_name +
              '","description":"' +
              playlist_description +
              '","public":true}';

            var options = {
              url:
                "https://api.spotify.com/v1/users/" +
                query_userid +
                "/playlists",
              method: "POST",
              headers: headers,
              body: dataString,
            };

            async function callback(error, response, body) {
              if (!error && response.statusCode == 201) {
                var plist_data = JSON.parse(body);

                UserData.findOneAndUpdate(
                  { _id: query_id },
                  {
                    $push: {
                      playlists: {
                        playlist_id: plist_data.id,
                        ownership: 1,
                        playlist_name: "",
                        playlist_description: "",
                        playlist_cover: "",
                      },
                    },
                  },
                  function (error, success) {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log(success);
                      resolve("success!");
                    }
                  }
                );
              } else {
                console.log(error);
                if (response.statusCode === 401) {
                  console.log("Authorization Token Expired or Invalid");
                  let result = await module.exports.refreshToken(query_refresh);
                  //console.log(result);
                  if (result === true) {
                    module.exports.createPlaylist(query_id, p_name, p_desc);
                  } else {
                    resolve("Could not refresh access token!");
                  }
                } else {
                  resolve("Great Failure:" + response.statusCode);
                }
              }
            }

            request(options, callback);
          })
          .catch((err) => {
            console.log(err);
          });
      }, 3000);
    });
  },

  refreshToken: async function refreshToken(query_refresh) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //Get the refreshtoken from param
        //use refresh token to make post request to API
        var refresh_token = query_refresh;
        var authOptions = {
          url: "https://accounts.spotify.com/api/token",
          headers: {
            Authorization:
              "Basic " +
              new Buffer(
                process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
              ).toString("base64"),
          },
          form: {
            grant_type: "refresh_token",
            refresh_token: refresh_token,
          },
          json: true,
        };

        request.post(authOptions, function (error, response, body) {
          if (!error && response.statusCode === 200) {
            console.log(body);
            var new_access_token = body.access_token;

            UserData.findOneAndUpdate(
              { refresh_token: query_refresh },
              { $set: { access_token: new_access_token } },
              { new: true },
              (err, doc) => {
                if (err) {
                  console.log(err);
                  resolve(false);
                } else {
                  console.log(doc);
                  resolve(true);
                }
              }
            );
          } else {
            console.log(response.statusCode);
            console.log(body);
            console.log(error);
            resolve(false);
          }
        });

        //Process the information sent back from API
        //Update user document with new access token / refresh token
        //resolve new access token
      }, 3000);
    });
  },

  addSongToPlaylist: async function addSongToPlaylist(
    song_id,
    host_id,
    friend_id,
    comment,
    rating
  ) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //Access token of host_id,

        Playlist.findOne({ id: host_id })
          .exec()
          .then((doc) => {
            console.log(doc);
            const query_playlistid = doc.playlist_id;

            User.findOne({ id: host_id })
              .exec()
              .then((doc2) => {
                console.log(doc2);
                const host_token = doc2.access_token;
                const query_refresh = doc2.refresh_token;
                const escaped_song_id = escape(song_id);
                //Insert Song into playlist

                var headers = {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + host_token,
                };

                //trackid: spotify:track:49H4LDNFE5BU7ZMIg8UsZy

                var options = {
                  url:
                    "https://api.spotify.com/v1/playlists/" +
                    query_playlistid +
                    "/tracks?uris=" +
                    escaped_song_id,
                  method: "POST",
                  headers: headers,
                };

                async function callback(error, response, body) {
                  if (!error && response.statusCode == 201) {
                    console.log(body);
                    const recommendation = new Recommendation({
                      _id: new mongoose.Types.ObjectId(),
                      track_id: song_id,
                      playlist_id: query_playlistid,
                      host_id: host_id,
                      friend_id: friend_id,
                      comment: comment,
                      rating: rating,
                    });

                    recommendation.save().then((result) => {
                      console.log(result);
                      resolve("sucesss!");
                    });
                  } else if (response.statusCode === 401) {
                    let result = await module.exports.refreshToken(
                      query_refresh
                    );
                    if (result === true) {
                      module.exports.addSongToPlaylist(
                        song_id,
                        host_id,
                        friend_id,
                        comment,
                        rating
                      );
                    } else {
                      resolve("Could not refresh access token!");
                    }
                  } else {
                    console.log(response.statusCode);
                    console.log(body);
                    resolve("Playlist Add Failure:" + response.statusCode);
                  }
                }

                //If successful, Insert into database

                request(options, callback);
              });
          });
      }, 3000);
    });
  },
  getPlaylistInfo: async function getPlaylistInfo(
    userCookie,
    playlist_id,
    access_token,
    refresh_token
  ) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // console.log(playlist_id);
        // console.log(access_token);
        // console.log(refresh_token);

        var headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        };

        var options = {
          url: "https://api.spotify.com/v1/playlists/" + playlist_id,
          headers: headers,
        };

        async function callback(error, response, body) {
          if (!error && response.statusCode == 200) {
            //console.log(body);
            var jsonob = JSON.parse(body);
            var playlistData = {
              p_name: jsonob.name,
              p_desc: jsonob.description,
              p_images: jsonob.images,
              p_id: playlist_id,
            };

            resolve(playlistData);

            //console.log(playlistData);

            // UserData.findOneAndUpdate(
            //   { _id: userCookie, "playlists.playlist_id": playlist_id },
            //   {
            //     $set: {
            //       "playlists.playlist_name": jsonob.name,
            //       playlist_description: jsonob.description,
            //       playlist_cover: jsonob.images,
            //     },
            //   }
            // );

            return;
          } else if (response.statusCode === 401) {
            let result = await module.exports.refreshToken(refresh_token);
            if (result === true) {
              UserData.findOne({ refresh_token: refresh_token })
                .exec()
                .then((doc2) => {
                  console.log(doc2);
                  const new_token = doc2.access_token;
                  module.exports.getPlaylistInfo(
                    userCookie,
                    playlist_id,
                    new_token,
                    refresh_token
                  );
                });
            } else {
              resolve("Could not refresh access token!");
            }
          }
        }

        request(options, callback);
      }, 3000);
    });
  },

  getTracks: async function getTracks(playlist_id, userCookie) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var query_token;
        var refresh_token;
        UserData.findById(userCookie)
          .exec()
          .then((doc) => {
            //console.log(doc);
            query_token = doc.access_token;
            refresh_token = doc.refresh_token;
            var headers = {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + query_token,
            };

            var options = {
              url: "https://api.spotify.com/v1/playlists/" + playlist_id,
              headers: headers,
            };

            async function callback(error, response, body) {
              if (!error && response.statusCode == 200) {
                //console.log(body);
                var jsonob = JSON.parse(body);
                var tracks = {
                  trackArray: jsonob.tracks,
                };

                resolve(tracks);

                return;
              } else if (response.statusCode === 401) {
                let result = await module.exports.refreshToken(refresh_token);
                if (result === true) {
                  UserData.findOne({ refresh_token: refresh_token })
                    .exec()
                    .then((doc2) => {
                      console.log(doc2);
                      const new_token = doc2.access_token;
                      module.exports.getPlaylistInfo(
                        userCookie,
                        playlist_id,
                        new_token,
                        refresh_token
                      );
                    });
                } else {
                  resolve("Could not refresh access token!");
                }
              }
            }

            request(options, callback);
          });
      }, 3000);
    });
  },
};
