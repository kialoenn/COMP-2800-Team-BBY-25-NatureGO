// REQUIRES
const express = require('express');
const app = express();
const fs = require("fs");
const ExifReader = require('exifreader');

// GENERAL CONSTANTS
const msg404 = 'These are not the codes that you are looking for.';


// STATIC DIRECTORIES
app.use('/css', express.static('private/css'));
app.use('/img', express.static('private/img'));
app.use('/js', express.static('private/js'));
app.use('/html', express.static('private/html'));
app.use('/pic', express.static('private/pic'));

//APP GETS
app.get('/', function (req, res) {

    res.set('Server', 'NatureGO');
    res.set('Server', 'BBY');

    fs.readFile("./private/html/index.html", function (error, pgRes) {
        if (error) {
            res.writeHead(404);
            res.write(msg404);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(pgRes);
        }

        res.end();
    });

});


// RUN SERVER
let port = 8000;
app.listen(port, function () {
    console.log('listening on port ' + port + '!');
});
