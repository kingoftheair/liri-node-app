require("dotenv").config();
let request = require("request");
let fs = require("fs");
let moment = require("moment");
let Spotify = require("node-spotify-api");
let chalk = require("chalk");
let keys = require("./keys.js");

let action = process.argv[2];
let search = process.argv[3];

console.log(action + search);

function liri(action, search) {
    switch (action) {
        case "movie-this":
            if (search === undefined) {
                search = "Mr. Nobody";
            }
            request("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy",
                function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        let movie = JSON.parse(body);
                        console.log(chalk.green(movie.Title))
                    }
                }
            )

    }
}

liri(action, search);