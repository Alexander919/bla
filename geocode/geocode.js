const request = require('request');

function geocodeAddress(address) {
    const encodedAddress = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.API_KEY}`,
        json: true
    }, (err, res, body) => {
        if (err) {
            console.log(`${err}. Unable to connect to the server`);
        } else if (body.status === 'ZERO_RESULTS') {
            console.log('Unable to find that address.');
        } else {
            console.log(body.results[0].formatted_address);
            console.log(body.results[0].geometry.location.lat);
            console.log(body.results[0].geometry.location.lng);
        }
    });
}

module.exports = {geocodeAddress};