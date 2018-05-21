console.log('__________________________');
console.log('Starting LIRI');
console.log('__________________________');

// Read .env variables
require("dotenv").config();
// Import the request npm package
var request = require('request');
// Import the twitter npm package
var twitter = require("twitter");
// Import the node-spotify-api npm package
var Spotify = require("node-spotify-api");
// Import the FS package for read/writing
var fs = require('fs');
// Import the API keys
var keys = require("./keys");


// Take in the command line text
var command = process.argv[2];
var argument = process.argv[3];
var output;


// Function 1. `node liri.js my-tweets`

// Setup get & parameters
var myTweets = function() {
  var client = new twitter(keys.twitter);
  var params = {
    screen_name: "bowden_dev"
  };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log("");
        console.log(tweets[i].text);
        console.log('__________________________');

      }
    }
  });
};

//Function 2. `node liri.js spotify-this-song '<song name here>'`

// Setup get & parameters
var Spotify = new Spotify(keys.spotify);

// If songname undefined return Tom as undefined.
var spotifyThisSong = function(songName) {
	if (songName === undefined) {
    songName = "Ninth And Hennepin";
  }
  Spotify.search(
    {
      type: "track",
      query: songName
    },
    function(err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }
      //if no error iterate throught the array and log these params
      var songs = data.tracks.items;
      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log('__________________________');
				console.log("Artist(s): " + songs[i].artists.map(getArtistNames));
				console.log('_ _ _ _ _ _ _ _ _ _ _ _ _ ');
        console.log("Song Name: " + songs[i].name);
				console.log('_ _ _ _ _ _ _ _ _ _ _ _ _ ');
        console.log("Preview: " + songs[i].preview_url);
				console.log('_ _ _ _ _ _ _ _ _ _ _ _ _ ');
        console.log("Album: " + songs[i].album.name);
        console.log('__________________________');
      }
    }
  );
};

// Writes to the log.txt file
var getArtistNames = function(artist) {
  return artist.name;
};



//Function 3. `node liri.js movie-this '<movie name here>'`'`
var movieThis = function(movieName) {
  if (movieName === undefined) {
    movieName = "Mr Nobody";
  }
  var urlHit =
    "http://www.omdbapi.com/?t=" +
    movieName +
    "&y=&plot=full&tomatoes=true&apikey=trilogy";
  request(urlHit, function(error, response, body) {
    if (!error && response.statusCode === 200) {
			var jsonData = JSON.parse(body);
			console.log('__________________________');
			console.log("Title: " + jsonData.Title);
			console.log('_ _ _ _ _ _ _ _ _ _ _ _ _ ');
      console.log("Year: " + jsonData.Year);
			console.log('_ _ _ _ _ _ _ _ _ _ _ _ _ ');
      console.log("Rated: " + jsonData.Rated);
			console.log('_ _ _ _ _ _ _ _ _ _ _ _ _ ');
      console.log("IMDB Rating: " + jsonData.imdbRating);
			console.log('_ _ _ _ _ _ _ _ _ _ _ _ _ ');
      console.log("Country: " + jsonData.Country);
			console.log('_ _ _ _ _ _ _ _ _ _ _ _ _ ');
      console.log("Language: " + jsonData.Language);
			console.log('_ _ _ _ _ _ _ _ _ _ _ _ _ ');
      console.log("Plot: " + jsonData.Plot);
			console.log('_ _ _ _ _ _ _ _ _ _ _ _ _ ');
      console.log("Actors: " + jsonData.Actors);
			console.log('_ _ _ _ _ _ _ _ _ _ _ _ _ ');
      console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
			console.log('__________________________');
    }
  });
};

// Function 4. `node liri.js do-what-it-says`
var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);
    var dataArr = data.split(",");
    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    } else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }
  });
};



// Function for determining which command is executed
var pick = function(caseData, functionData) {
  switch (caseData) {
    case "my-tweets":
			myTweets();
			break;
			
    case "spotify-this-song":
      spotifyThisSong(functionData);
			break;
			
    case "movie-this":
      movieThis(functionData);
			break;
			
    case "do-what-it-says":
      doWhatItSays();
			break;
			
    default:
      console.log("LIRI don't play that.");
  }
};

// Take in the command line arguments and execute correct function accordigly
var runLIRI = function(arg1, arg2) {
  pick(arg1, arg2);
};

// Where I actually call the function
runLIRI(process.argv[2], process.argv[3]);
console.log("LIRI is go!");
console.log('--------------------------');
