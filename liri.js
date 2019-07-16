require("dotenv").config();

var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");
var SpotifyAPI = require('node-spotify-api');
var moment = require('moment')
var spotify = new SpotifyAPI(keys.spotify);

var inputString = process.argv;

runCommand(inputString[2],inputString[3]);

function runCommand(action, input1) {
   
    switch (action) {
        // * CONCERT *
        case "concert-this":
            var concert = input1;
            if (!concert || !concert.trim()) {
                return console.log("You must provide a valid concert to search.")
            }
            concertThis(concert.trim().toLowerCase());
            break;
        // * SPOTIFY *
        case "spotify-this-song":
            var name = input1;
            if (name === undefined) {
                name = "The Sign Ace"
            }
            songThis(name);
            break;
        // * MOVIE *
        case "movie-this":
            var name = input1;
            movieThis(name);
            break;
        // * RANDOM.TXT *
        case "do-what-it-says":
            showRandom();
            break;
    }
}

function songThis(input1) {
    spotify.search(
        {
            type: "track",
            query: input1
        },
        function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            var songs = data.tracks.items;

                console.log("~*~*~*~*~*~*~*~*~*~*~*~*~");
                console.log("Song name: " + songs[0].name);
                console.log("Artist(s): " + songs[0].artists[0].name);
                console.log("Preview song: " + songs[0].preview_url);
                console.log("Album: " + songs[0].album.name);
                console.log("~*~*~*~*~*~*~*~*~*~*~*~*~");  

        }
    );
};

function concertThis(input1) {
    var queryURL = "https://rest.bandsintown.com/artists/" + input1 + "/events?app_id=codingbootcamp"
    axios.get(queryURL).then(
        function(response) {
        console.log("~*~*~*~*~*~*~*~*~*~*~*~*~"); 
        console.log (response.data[0].lineup + "'s peforming at: ")
        console.log("\nVenue: " + response.data[0].venue.name);
        console.log("\nLocation: " + response.data[0].venue.country);
        console.log("\nDate: " + moment(response.data[0].datetime).format('L'));
        console.log("~*~*~*~*~*~*~*~*~*~*~*~*~"); 
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}

function movieThis(input1) {
    if (input1 === undefined){
        input1 = "Mr. Nobody"
        console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947");
        console.log("It's on Netflix!")
    }
    var queryURL = "http://www.omdbapi.com/?t=" + input1 + "&y=&plot=short&apikey=trilogy"
    axios.get(queryURL).then(
        function(response) {
        console.log("~*~*~*~*~*~*~*~*~*~*~*~*~"); 
        console.log ("Movie: " + response.data.Title);
        console.log ("Year: " + response.data.Year);
        console.log ("imdb Rating: " + response.data.imdbRating);
        console.log ("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log ("Country: " + response.data.Country);
        console.log ("Language: " + response.data.Language);
        console.log ("Plot: \n" + response.data.Plot);
        console.log ("Actors: " + response.data.Actors);
        console.log("~*~*~*~*~*~*~*~*~*~*~*~*~"); 
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}

function showRandom(){
	fs.readFile('random.txt', 'utf8', function(err, data){
		if (err){ 
			return console.log(err);
		}
        var dataArr = data.split(',');
        runCommand(dataArr[0], dataArr[1]);
	});
}