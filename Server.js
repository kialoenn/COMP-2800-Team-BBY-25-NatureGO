// REQUIRES
const express = require('express');
const fs = require("fs");
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000

var firebase = require('firebase');
var firebaseConfig = {
    apiKey: "AIzaSyAI2XYfwipMKzMn7accv1VmborqKBg9j_E",
    authDomain: "naturego-e74d6.firebaseapp.com",
    projectId: "naturego-e74d6",
    storageBucket: "naturego-e74d6.appspot.com",
    messagingSenderId: "641465486710",
    appId: "1:641465486710:web:8bb01d58ea9d7136083e57"
};
// Initialize Firebase
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// GENERAL CONSTANTS
const msg404 = 'These are not the codes that you are looking for.';


// STATIC DIRECTORIES
app.use('/css', express.static('private/css'));
app.use('/img', express.static('private/img'));
app.use('/js', express.static('private/js'));
app.use('/html', express.static('private/html'));

// APP GETS
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



//app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

// // RUN SERVER
// let port = 8000;
// app.listen(port, function () {
//     console.log('listening on port ' + port + '!');
// });

// Modify server to store user data

//Store photo in user collection