require('dotenv').config()

console.log('//////starting liri//////');

// const dotenv = require("dotenv").config();
const fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
const argv = require('yargs').argv
var Spotify = require('node-spotify-api');

///////////////////////// omdb request

console.log('//////omdb start//////');
var searchTerm = "Cool%20Runnings";

    request('http://www.omdbapi.com/?i=tt3896198&apikey=8a27920b&t=' + searchTerm, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the omdb homepage.
    // });
      // If the request is successful (i.e. if the response status code is 200)
      if (!error && response.statusCode === 200) {
        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
      }
    });
console.log('//////omdb end//////');


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
  
  spotify
    .search({ type: 'track', query: 'All the Small Things' })
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

