const request = require('request');

function fetchWeather({lat, lng}, cb) {
    request({
        url: `https://api.darksky.net/forecast/${process.env.W_APIKEY}/${lat},${lng}?units=si`,
        json: true
    }, (err, res, body) => {
        if (!err && res.statusCode === 200) {
            cb(null, body.currently);
        } else {
            cb('Unable to connect to the darksky.net server');
        }
    });
        
}

module.exports.fetchWeather = fetchWeather;