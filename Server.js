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
    storageBucket: "naturego-e74d6.appspot.com"
});
var bucket = admin.storage().bucket();
const db = admin.firestore();
// GENERAL CONSTANTS
const msg404 = 'These are not the codes that you are looking for.';
const animalDB = ['Duck', 'Cat', 'Bear'];
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
    if (req.file) {
        //let result = await quickstart(req.file.path)
        let imageURL = "";

        const blob = bucket.file(req.file.originalname);
        blob.name = 'uU8tulEzehbRnnbR9hoNgmXhyUI2' + new Date().valueOf() + '.jpeg';
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
            animalDB.forEach(animal => {
                if (labels.find(a => a.includes(animal))){
                    animalType = animal;
                };
                
            })

            console.log(animalType);
            if (animalType == undefined) {
                res.send({
                    status: 'error',
                })
            } else {
                assignURL().then(function (url) {
                    imageURL = url;
                    var dbref = db.collection("users").doc("2B02XrEUFLglZfThUas1fsPQ6R43").collection("animals");
    
                    dbref.doc().set({
                        url: imageURL,
                        type: animalType
                    })
                });
                res.send({
                    status: 'success',
                    type: animalType,
    
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
app.get('/get-customers', function (req, res) {

    db.collection("users").doc("uU8tulEzehbRnnbR9hoNgmXhyUI2")
        .get()
        .then(function (doc) {
            // grabs data from user doc
            var mail = doc.data().email;

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
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