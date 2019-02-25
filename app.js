const request = require('request');

request({
    url: `https://jsonplaceholder.typicode.com/posts/1`,
    json: true
}, (err, res, body) => {
    console.log(res.statusCode);
});