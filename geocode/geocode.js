const request = require('request');

function fetchWeather({address, lat, lng}) {
    request({
        url: `https://api.darksky.net/forecast/${process.env.W_APIKEY}/${lat},${lng}?units=si`,
        json: true
    }, (err, res, body) => {
        if (!err && res.statusCode === 200) {
            console.log(address);
            console.log(body.currently.temperature);
        } else {
            console.log('Unable to connect to the darksky.net server');
        }
    });
        
}
function geocodeAddress(address, cb) {
    const encodedAddress = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.API_KEY}`,
        json: true
    }, (err, res, body) => {
        if (err) {
            cb(`${err}. Unable to connect to the server`);
        } else if (body.status === 'ZERO_RESULTS') {
            cb('Unable to find that address.');
        } else {
            const resObj = {
                address: body.results[0].formatted_address,
                lat: body.results[0].geometry.location.lat,
                lng: body.results[0].geometry.location.lng
            }
            cb(null, resObj);
        }
    });
}

module.exports = {
    geocodeAddress,
    fetchWeather
};