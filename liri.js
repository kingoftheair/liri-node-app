let dotenv = require("dotenv").config();
let axios = require("axios");
let moment = require("moment");
let keys = require("./keys.js");
let Spotify = require("node-spotify-api");
let fs = require('fs');


function getFilm() {
    let query = process.argv.slice(3).join(" ");
    if (query == "") {
        query = "Mr nobody";
    }
    axios.get("https://www.omdbapi.com/?t="+ query +"&apikey=63087046&plot=full").then(
        function(res) {
            let movie = res.data;
            if (movie.Title == undefined) {
                console.log("There was no movie found in our database.")
            } else {
                console.log(`\nThe title is "${movie.Title}".`);
                console.log(`It came out in ${movie.Year}.`);
                console.log(`IMDB rated it a ${movie.imdbRating}.`)
                console.log(`Rotten Tomatoes gives it a rating of ${movie.Ratings[1].Value}.`)
                console.log(`Country: ${movie.Country}.`)
                console.log(`Langauges: ${movie.Language}.`)
                console.log(`The plot is "${movie.Plot}"`)
                console.log(`The main actors are: ${movie.Actors}.\n`)
        } 
    })
}


function getBands() {
    let artist = process.argv.slice(3).join(" ");
    console.log("\n" + artist.toUpperCase() + " tour dates:");
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function(res) {
            // console.log(res);
            if (res.data.length === 0 || res.data.errorMessage || res.data[0].venue === undefined) {
                console.log("Sorry, no tour dates currently scheduled.")
            } else if (res.data.length > 0) {
                for (let i = 0; i < res.data.length; i++) {    
                    if (res.data[i].venue.region === "") {
                        console.log(`\n${res.data[i].venue.name} - ${res.data[i].venue.city}, ${res.data[i].venue.country} - ${moment(res.data[i].datetime).format("MM/DD/YYYY")}`);
                    } else {
                        console.log(`\n${res.data[i].venue.name} - ${res.data[i].venue.city}, ${res.data[i].venue.region} ${res.data[i].venue.country} - ${moment(res.data[i].datetime).format("MM/DD/YYYY")}`);
                    }
                }
                        console.log("\n");
                }
            }
        )
};


function getSong() {
    let song = process.argv.slice(3).join(" ");
    let spotify = new Spotify(keys.spotify);
    if (song == "") {
        song = "the sign ace of base";
    }
        spotify
        .search({ type: 'track', query: song, limit: 1 })
        .then(function(response) {         
            for (let i = 0; i < response.tracks.items.length; i++) {
                let spot = response.tracks.items[i];
                        console.log(`\nArtist: ${spot.artists[0].name}`);
                        console.log(`Title: ${spot.name}`);
                        console.log(`Soundclip: ${spot.external_urls.spotify}`)
                        console.log(`From the album, "${spot.album.name}."\n`)
                    }  
        })
        .catch(function(err) {
            console.log(err);
    });
}


function doWhat() {
    let fileName = 'random.txt';
    fs.readFile(fileName, 'utf8', function(error, data) {
        if (error) {
            console.log(`lol u messed up, read the error dawg...${error}`)
        }  
        let fileSplit = (data.split(","));
        if (fileSplit[0] === "movie-this") {
            let query = fileSplit[1];
            axios.get("https://www.omdbapi.com/?t="+ query +"&apikey=c4a1de54&plot=full").then(
            function(res) {
            let movie = res.data;
            if (movie.Title == undefined) {
                console.log("There was no movie found in our database.")
            } else {
                console.log(`\nThe title is "${movie.Title}".`);
                console.log(`It came out in ${movie.Year}.`);
                console.log(`IMDB rated it a ${movie.imdbRating}.`)
                console.log(`Rotten Tomatoes gives it a rating of ${movie.Ratings[1].Value}.`)
                console.log(`Country: ${movie.Country}.`)
                console.log(`Langauges: ${movie.Language}.`)
                console.log(`The plot is "${movie.Plot}"`)
                console.log(`The main actors are: ${movie.Actors}.\n`)
        } 
    })
        } else if (fileSplit[0] === "concert-this") {
            let artist = fileSplit[1];
            console.log("\n" + artist.toUpperCase() + " tour dates:");
            axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
                function(res) {
                    if (res.data.length === 0 || res.data.errorMessage || res.data[0].venue === undefined) {
                        console.log("Sorry, no tour dates currently scheduled.")
                    } else if (res.data.length > 0) {
                        for (let i = 0; i < res.data.length; i++) {    
                            if (res.data[i].venue.region === "") {
                                console.log(`\n${res.data[i].venue.name} - ${res.data[i].venue.city}, ${res.data[i].venue.country} - ${moment(res.data[i].datetime).format("MM/DD/YYYY")}`);
                            } else {
                                console.log(`\n${res.data[i].venue.name} - ${res.data[i].venue.city}, ${res.data[i].venue.region} ${res.data[i].venue.country} - ${moment(res.data[i].datetime).format("MM/DD/YYYY")}`);
                            }
                        }
                                console.log("\n");
                        }
                    }
                )
        } else if (fileSplit[0] === "spotify-this-song") {   
            let spotify = new Spotify(keys.spotify);         
            let song = fileSplit[1];
            spotify
            .search({ type: 'track', query: song, limit: 1 })
            .then(function(response) {
                for (let i = 0; i < response.tracks.items.length; i++) {
                    let spot = response.tracks.items[i];
                            console.log(`\nArtist: ${spot.artists[0].name}`);
                            console.log(`Title: ${spot.name}`);
                            console.log(`Soundclip: ${spot.external_urls.spotify}`)
                            console.log(`From the album, "${spot.album.name}."\n`)   
                } 
            })
            .catch(function(err) {
            console.log(err);
            });
        }
      })
};


let arg2 = process.argv[2];
switch (arg2) {
    case "movie-this":
        getFilm();
         break;
    case "concert-this":
        getBands();
        break;
    case "spotify-this-song":
        getSong();
        break;
    case "do-what-it-says":
        doWhat(); 
        break;
    default: console.log("\nNo option selected. \nYou must select from 'movie-this', 'concert-this', and 'spotify-this-song'\n")
}