const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (err, results) => {
    if (err) {
        console.log(err);
    } else {
        weather.fetchWeather(results, (err, weatherRes) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Temperature in ${results.address} is: \n${weatherRes.temperature}℃\nAnd it feels like: ${weatherRes.apparentTemperature}℃`);
            }
        });
    }
});