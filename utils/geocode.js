const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoid2FyYWljaCIsImEiOiJja2V4cGd4aWgzMXJpMnNwbmZ1cDUzY2QwIn0.9dIZE4tW-2lczKe1Jzi2og&limit=1";
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to service locations", undefined);
    } else if (body.features.lenght === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].geometry.coordinates[1],
        longitude: body.features[0].geometry.coordinates[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
