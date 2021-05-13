// REQUIRES
const express = require('express');
const vision = require('@google-cloud/vision');
const fs = require("fs");
const app = express();
const path = require('path')
const PORT = process.env.PORT || 8000


var admin = require("firebase-admin");
var serviceAccount = require("./firebase_auth.json");

admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
storageBucket:"naturego-e74d6.appspot.com"
});
var bucket = admin.storage().bucket();
const db = admin.firestore();
// GENERAL CONSTANTS
const msg404 = 'These are not the codes that you are looking for.';
const multer = require('multer');
const upload = multer({storage: Multer.memoryStorage()});


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


app.post('/upload', upload.single('photo'), async (req, res) => {
    if(req.file) {
        let result = await quickstart(req.file.path)
        res.send(result);
    }
    else throw 'error';
});


// // RUN SERVER
// let port = 8000;
// app.listen(port, function () {
//     console.log('listening on port ' + port + '!');
// });
app.get('/get-customers', function (req, res) {

    db.collection("users").doc("uU8tulEzehbRnnbR9hoNgmXhyUI2")
    .get()
    .then(function (doc) {
        // grabs data from user doc
        var mail = doc.data().email;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(mail);    
    })
});


async function quickstart(fileName) {
    // Imports the Google Cloud client library
    
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient({
        keyFilename: 'visionAPI.json'
    });
  
    // Performs label detection on the image file
    const [result] = await client.labelDetection(fileName);
    const labels = result.labelAnnotations;
    // console.log('Labels:');
    // labels.forEach(label => console.log(label.description));
    return labels;
}

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));