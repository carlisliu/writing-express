/*When we create a node server, using codes like the following:

const http = require('http');
const server = http.createServer(function(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});
server.listen(3000, () => {
    console.log('server running.');
});

whenever a request is coming, it will always trigger listener which we passed as a parameter to `createServer` function.
This listener function accepts two parameter. The first one is the http request object, and the second is http response object.
Everything we want to accomplish are within this listener function.

Express abstracts this logic process for us. Let's see how express works.
*/

var express = function() {
    function app(req, res, next) {
        next = next || function() {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Hello World\n');
        };

        // do logic process.

        // finished, response to client request.
        next();
    }

    extend(app);

    // initialization
    app.init();

    return app;
};

const http = require('http');
// Declare express as a function, and return a function which accept two parameters as a listener for `http.createServer`
const app = express();
// Pass the listener function to `http.createServer`.
const server = http.createServer(app);
server.listen(3000, () => {
    console.log('server running.');
});

/*
Obviously, express function is the point here. Let's focus on it.
*/

function extend(app) {
    app.init = function() {
        this.cache = {};
        this.engines = {};
        this.settings = {};
    };
}