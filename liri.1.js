console.log('//////starting liri//////');

const dotenv = require("dotenv").config();
const fs = require('fs');

var config = require('./config');

const keys = require('./keys');

const request = require('./request');
var Twitter = require('./twitter');
var Spotify = require('./spotify');


///////////////////////// twitter request
function getTwitter() {
    console.log('//////twitter start//////');
    var client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      bearer_token: process.env.TWITTER_BEARER_TOKEN
    });

    try {
    client.get('favorites/list', function(error, tweets, response) {
      if (error) console.log(error);
      console.log(tweets);  // The favorites.
      console.log(response);  // Raw response object.
    });

    } catch(error) {
      console.log(error);
    }
    console.log('//////twitter end//////');
}

///////////////////////// spotify request

function getSpotify() { 
  console.log('//////spotify start//////');
    var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });
  
  spotify.search({ type: 'track', query: 'Between Thought and Expression' })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(err) {
      console.log(err);
  });
  console.log("//////spotify end//////");

}

console.log("//////ansync code is cool//////");

// Add the code required to import the `keys.js` file and store it in a variable.
var keys = require('./keys.js');

// You should then be able to access your keys information like so
  var spotify = new Spotify(keys.spotify);
  var client = new Twitter(keys.twitter);

///////////////////////// key stuff
// Solution 1 - More Obvious
var command = process.argv[2];
// var b = process.argv[3];

if (command === 'my-tweets') {
  console.log('twitter-connected');

    // https://dev.twitter.com/rest/reference/get/statuses/user_timeline
    client.get('statuses/user_timeline', { screen_name: 'bowden_dev', count: 20 }, function(error, tweets, response) {
      if (!error) {
      }
      else {
        console.log("You've got error!")
      }
    });
  
}
else {
  console.log(false);
}

