/**
 * This is the server file that commuicates between client and firesbase database
 * @author Neeraj Kumar
 * @author Man Sun
 * @author Richard Mac
 * @author Michael Wang
 * */

// REQUIRED npm packages
const express = require('express');
const vision = require('@google-cloud/vision');
const fs = require("fs");
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8000
const multer = require('multer');

//Intialize firabse

var admin = require("firebase-admin");
var serviceAccount = require("./firebase_auth.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "naturego-e74d6.appspot.com"
});

//Intialize firabse storage

var bucket = admin.storage().bucket();
const db = admin.firestore();

// GENERAL CONSTANTS
const msg404 = 'These are not the codes that you are looking for.';
var animalDB = ['Black Swift', 'Cougar,Raccoon', 'Wolf', 'Black bear', 'Canada goose', 'Coyote', 'Sockeye salmon'];
const {
    BlockList
} = require('net');
const upload = multer({
    storage: multer.memoryStorage()
});

// STATIC DIRECTORIES
app.use('/css', express.static('private/css'));
app.use('/img', express.static('private/img'));
app.use('/js', express.static('private/js'));
app.use('/html', express.static('private/html'));
app.use('/fonts', express.static('private/fonts'));


// APP GETS
// Servers up the login.html on root directory
app.get('/', function (req, res) {

    res.set('Server', 'NatureGO');
    res.set('Server', 'BBY');

    fs.readFile("./private/html/login.html", function (error, pgRes) {
        if (error) {
            res.writeHead(404);
            res.write(msg404);
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(pgRes);
        }
        res.end();
    });
});

// Post the uploaded photo to cloud storage 
app.post('/upload', upload.single('photo'), async (req, res) => {

    if (req.file) {
        // let result = await quickstart(req.file.path)
        //let result = await quickstart(req)
        let imageURL = "";

        const blob = bucket.file(req.file.originalname);
        blob.name = req.body.id + '|' + new Date().valueOf() + '.jpeg';
        const blobStream = blob.createWriteStream();

        blobStream.on('finish', async () => {
            const config = {
                action: 'read',

                // A timestamp when this link will expire
                expires: '01-01-2026',
            };

            // function to get URL from storage
            function getURL(blob) {
                return new Promise((resolve, reject) => {
                    blob.getSignedUrl(config, function (err, url) {
                        if (err) {
                            console.error(err);
                            reject(err);
                        }
                        resolve(url);
                    });
                });
            }

            async function assignURL() {
                let temp = await getURL(blob);
                return temp;
            }
            //get the labels of the image using Vision API
            let result = await quickstart(`gs://naturego-e74d6.appspot.com/${blob.name}`);
            let labels = [];
            result.forEach(label => {
                labels.push(label.description);
            });
            // console.log(labels);
            let animalType;
            // Compare the labels to animaltypes in database
            // console.log('db: ' + animalDB);
            animalDB.forEach(animal => {
                if (labels.find(function (a) {
                        if (a.length >= animal.length) {
                            return a.toUpperCase().includes(animal.toUpperCase());
                        } else {
                            return animal.toUpperCase().includes(a.toUpperCase());
                        }
                    })) {
                    animalType = animal;
                }
            });     
            //delete the image from storage if its inavlid 
            if (animalType == undefined) {
                async function deleteFile() {
                    await bucket.file(blob.name).delete();
                    // console.log('deleted');
                }
                deleteFile().catch(console.error);
                res.send({
                    status: 'error',
                });
            } else {
                // Store the animal details in animal collection under user
                assignURL().then(function (url) {
                    imageURL = url;
                    // console.log("type" + animalType)
                    var dbref = db.collection("users").doc(req.body.id).collection("animals");

                    dbref.where('type', '==', animalType)
                        .get()
                        .then(function (snap) {
                            if (snap.docs.length == 0) {
                                dbref.doc().set({
                                    url: imageURL,
                                    type: animalType,
                                    GPS: {
                                        lat: req.body.lat,
                                        lng: req.body.lng,
                                    }
                                }).catch(e => {
                                    // console.log(e)
                                });
                                // console.log("success");
                                res.send({
                                    status: 'success',
                                    type: animalType,
                                    url: imageURL,
                                    GPS: {
                                        lat: req.body.lat,
                                        lng: req.body.lng,
                                    },
                                });
                            } else {
                                async function deleteFile() {
                                    await bucket.file(blob.name).delete();
                                    // console.log('deleted');
                                }
                                deleteFile().catch(console.error);
                                res.send({
                                    status: 'existed',
                                });
                            }
                        });
                });
            }
        });

        blobStream.end(req.file.buffer);

        // console.log("my url is " + imageURL);

    } else throw 'error';
});

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// get the user name from database

app.post('/get-name', function (req, res) {
    // console.log(req.body.id);
    db.collection("users").doc(req.body.id)
        .get()
        .then(function (doc) {
            // grabs data from user doc
            var user = doc.data().name;
            res.setHeader('Content-Type', 'application/HTML');
            res.send(user);
        });
});

// get the user email from database

app.post('/get-email', function (req, res) {
    // console.log(req.body.id);
    db.collection("users").doc(req.body.id)
        .get()
        .then(function (doc) {
            // grabs data from user doc
            var user = doc.data().email;
            res.setHeader('Content-Type', 'application/HTML');
            res.send(user);
        });
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
    return labels;
}

// function to get the animal names from database
function getanimalnames() {
    return new Promise(function (res, rej) {
        db.collection("animals_info")
            .get()
            .then(function (querySnapshot) {
                let data = [];
                querySnapshot.forEach(function (doc) {
                    data.push(doc.data().name);
                });
                res(data);
            });
    });
}
// function to store animal names 
async function storeanimalDB() {
    animalDB = await getanimalnames();
    // console.log("results-------------");
    // console.log(animalDB);
}

app.use(function (req, res, next) {
    let file = fs.readFileSync('./private/html/404.html', 'utf8');
    res.status(404).send(file);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));