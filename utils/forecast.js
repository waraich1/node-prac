const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=fb4aef9c79bf097f7cccbc62eef54a94&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to connect to weather service", undefined);
    } else {
      callback(
        undefined,
        `The current temp is ${body.current.temperature} and the chances of rain are ${body.current.precip}%`
      );
    }
  });
};
// forecast(40.7831, -73.9712, (error, data) => {
//   console.log("error", error);
//   console.log("data", data);
// });
module.exports = forecast;
