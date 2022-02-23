const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=27840206f5e0f22e9a0e7c57dc379f87&query=${
    longitude + "," + latitude
  }`;

  request(
    {
      url,
      json: true,
    },
    (error, { body }) => {
      if (error) {
        callback("Unable to connect to Weather Forecast Service.", undefined);
      } else if (body.error) {
        callback("Unable to find location. Try another query.", undefined);
      } else {
        const { weather_descriptions } = body.current;
        const { temperature } = body.current;
        const { feelslike } = body.current;
        const { humidity } = body.current;
        callback(
          undefined,
          `It currently is ${weather_descriptions}, ${temperature} degrees outside and feels like ${feelslike}. The humidity is ${humidity}`
        );
      }
    }
  );
};

module.exports = forecast;
