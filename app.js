const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
const app = express();

const publicDirectoryPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Harkanwar Singh"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Harkanwar Singh"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Harkanwar Singh"
  });
});
app.get("/weather", (req, res) => {
  console.log(req.query);
  if (!req.query.address) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  geocode(req.query.address, (error, { latitude, longitude } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }
    forecast(latitude, longitude, (error, response) => {
      if (error) {
        console.log(error);
        return res.send({
          error: "There was an error"
        });
      }
      console.log(response);
      res.send({
        location: req.query.address,
        forecast: response
      });
    });
  });
});
app.get("/products", (req, res) => {
  res.send({
    products: []
  });
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }

  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Harkanwar Singh",
    errorMessage: "Help article not found."
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Harkanwar Singh",
    errorMessage: "Page not found."
  });
});
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
// const axios = require("axios");
// const request = require("request");
// const geocde = require("./utils/geocode");
// const forecast = require("./utils/forecast");

// geocode("Toronto", (error, { latitude, longitude } = {}) => {
//   // console.log("data", data);
//   console.log("erro", error);

//   forecast(latitude, longitude, (error, response) => {
//     if (error) {
//       return console.log(error);
//     }
//     console.log(latitude, longitude);
//     console.log("Data", response);
//     console.log("Error", error);
//   });
//   // console.log("Data", data);
// });

// axios
//   .get(url)
//   .then(Response => {
//     const data = Response.data;
//     console.log(data.current);
//   })
//   .catch(function(error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function() {
//     // always executed
//   });

// request({ url: url }, (error, response) => {
//   console.log(response);
// });
// const url =
//   "http://api.weatherstack.com/current?access_key=fb4aef9c79bf097f7cccbc62eef54a94&query=37.8267,-122.4233";
// const geoUrl =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoid2FyYWljaCIsImEiOiJja2V4cGd4aWgzMXJpMnNwbmZ1cDUzY2QwIn0.9dIZE4tW-2lczKe1Jzi2og&limit=1";
// request({ url: url, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect to weather service");
//   } else if (response.body.error) {
//     console.log("Unable to find location");
//   } else {
//     console.log(
//       `The current temp is ${response.body.current.temperature} and the chances of rain are ${response.body.current.precip}%`
//     );
//   }
// });

// request({ url: url, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect to weather service");
//   } else {
//     console.log(response.body.location.lat);
//     console.log(response.body.location.lon);
//   }
// });

// const geocode = (address, callback) => {
//   const url =
//     "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
//     encodeURIComponent(address) +
//     "Los%20Angeles.json?access_token=pk.eyJ1Ijoid2FyYWljaCIsImEiOiJja2V4cGd4aWgzMXJpMnNwbmZ1cDUzY2QwIn0.9dIZE4tW-2lczKe1Jzi2og&limit=1";
//   request({ url: url, json: true }, (error, response) => {
//     if (error) {
//       callback("Unable to connect to service locations", undefined);
//     } else if (response.body.features.lenght === 0) {
//       callback("Unable to find location", undefined);
//     } else {
//       callback(undefined, {
//         latitude: response.body.features[0].geometry.coordinates[0],
//         longitude: response.body.features[0].geometry.coordinates[1],
//         location: response.body.features[0].place_name
//       });
//     }
//   });
// };
