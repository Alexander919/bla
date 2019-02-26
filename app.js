const request = require('request');
const yargs = require('yargs');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;
//console.log(encodeURIComponent('dzintaru street 86-4'));
const encodedAddress = encodeURIComponent(argv.address);

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