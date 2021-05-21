// REQUIRES
const express = require('express');
const vision = require('@google-cloud/vision');
const fs = require("fs");
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8000


var admin = require("firebase-admin");
var serviceAccount = require("./firebase_auth.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "naturego-e74d6.appspot.com"
});
var bucket = admin.storage().bucket();
const db = admin.firestore();
// GENERAL CONSTANTS
const msg404 = 'These are not the codes that you are looking for.';
var animalDB = [];
const multer = require('multer');
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

// APP GETS
app.get('/', function (req, res) {

    res.set('Server', 'NatureGO');
    res.set('Server', 'BBY');

    fs.readFile("./private/html/index.html", function (error, pgRes) {
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

app.post('/upload', upload.single('photo'), async (req, res) => {
    console.log(req.body);
    console.log('id ' + req.body.id);
    console.log("request path: " + req.file.path);
    if (req.file) {
        // let result = await quickstart(req.file.path)
        //let result = await quickstart(req)
        let imageURL = "";

        const blob = bucket.file(req.file.originalname);
        blob.name = req.body.id + '|' + new Date().valueOf() + '.jpeg';
        const blobStream = blob.createWriteStream();


        blobStream.on('finish', async () => {
            // The public URL can be used to directly access the file via HTTP.
            // console.log(blob);
            // const publicUrl = format(
            //     `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            // );
            const config = {
                action: 'read',

                // A timestamp when this link will expire
                expires: '01-01-2026',
            };

            function getURL(blob) {
                return new Promise((resolve, reject) => {
                    blob.getSignedUrl(config, function (err, url) {
                        if (err) {
                            console.error(err);
                            reject(err);
                        }
                        console.log(url);
                        resolve(url);
                    })
                })
            }

            async function assignURL() {
                let temp = await getURL(blob);
                return temp;
            }

            let result = await quickstart(`gs://naturego-e74d6.appspot.com/${blob.name}`);
            let labels = [];
            result.forEach(label => {
                labels.push(label.description);
            })
            console.log(labels);
            let animalType;
            animalDB = await getanimalnames();
            console.log('db: ' + animalDB);
            animalDB.forEach(animal => {
                if (labels.find(function (a) {
                        if (a.length >= animal.length) {
                            return a.toUpperCase().includes(animal.toUpperCase())
                        } else {
                            return animal.toUpperCase().includes(a.toUpperCase())
                        }
                    })) {
                    animalType = animal;
                }

            })

            // console.log(animalType);
            if (animalType == undefined) {
                async function deleteFile() {
                    await bucket.file(blob.name).delete();
                    console.log('deleted');
                }
                deleteFile().catch(console.error);
                res.send({
                    status: 'error',
                })
            } else {
                assignURL().then(function (url) {
                    imageURL = url;
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
                                    console.log(e)
                                });
                                console.log("success");
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
                                    console.log('deleted');
                                }
                                deleteFile().catch(console.error);
                                res.send({
                                    status: 'existed',
                                })
                            }
                        })

                });

            }
        });

        blobStream.end(req.file.buffer);

        console.log("my url is " + imageURL);

    } else throw 'error';
});

// // RUN SERVER
// let port = 8000;
// app.listen(port, function () {
//     console.log('listening on port ' + port + '!');
// });

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.post('/get-name', function (req, res) {
    console.log(req.body.id);
    db.collection("users").doc(req.body.id)
        .get()
        .then(function (doc) {
            // grabs data from user doc
            var user = doc.data().name;
            res.setHeader('Content-Type', 'application/HTML');
            res.send(user);
        })

});

app.post('/get-email', function (req, res) {
    console.log(req.body.id);
    db.collection("users").doc(req.body.id)
        .get()
        .then(function (doc) {
            // grabs data from user doc
            var user = doc.data().email;
            res.setHeader('Content-Type', 'application/HTML');
            res.send(user);
        })

});

// app.post('/get-gps', function (req, res) {
//     console.log(req.body.id);
//     // db.collection("users").doc(req.body.id).collection("animals").where("lat", "!=", "")
//         db.collection("users").doc("2B02XrEUFLglZfThUas1fsPQ6R43").collection("animals").where("GPS.lat", "!=", "")
//     .get()
//     .then((photos) => {

//         res.send(photos);  
//     });
// });



async function quickstart(fileName) {
    // Imports the Google Cloud client library
    // Creates a client
    const client = new vision.ImageAnnotatorClient({
        keyFilename: 'visionAPI.json'
    });

    // Performs label detection on the image file
    const [result] = await client.labelDetection(fileName);
    // const [result] = await client.labelDetection({
    //     image: {
    //         content: req.file.buffer
    //     }
    // });
    const labels = result.labelAnnotations;
    // console.log('Labels:');
    // labels.forEach(label => console.log(label.description));
    return labels;
}

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
            })
    })
}

async function storeanimalDB() {
    animalDB = await getanimalnames();
    console.log("results-------------");
    console.log(animalDB);
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));