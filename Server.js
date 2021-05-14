// REQUIRES
const {
    format
} = require('util');
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
        const blobStream = blob.createWriteStream();


        blobStream.on('finish', () => {
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

            assignURL().then(function (url) {
                imageURL = url;
                db.collection("users").doc("uU8tulEzehbRnnbR9hoNgmXhyUI2")
                .update({
                    "collection": imageURL
                })
            });
            
           
        });

        blobStream.end(req.file.buffer);

        console.log("my url is " + imageURL);
        let result = await quickstart('https://storage.googleapis.com/naturego-e74d6.appspot.com/test.png?GoogleAccessId=firebase-adminsdk-lax59%40naturego-e74d6.iam.gserviceaccount.com&Expires=1767254400&Signature=EMPCE%2FuhdAARWTtwQszlwAwP3uHTTvmpvscy1aLVX%2B%2FaIVhylPq4Z7JN8szsZkAA0MRDgpkZG1jUVEZqbWL%2Fp64yuWCRMSL%2F8RDSZSx2FjAhwM3is2H6nYw73kb8%2BqQKlB7k6FCkRbZTtNdnkH4vL%2FwELRHjVXydXlIRrMyz0Akk7G50tl9jRumiJ92GlMuSxDbz1wOSbLSyGvwO6boXkO8ojS1p%2BWaPxF%2Fbu7qiJt97pBLBbmh4OU6sUM8Kw0eKS1zbswVCz3UE8%2FZH2cnF3%2FtMw7wALhX1zRrysw9u0WOApBKXXaD8iGYm4U659avFn5S00Op04HLuRsXb7MUcfw%3D%3D');
        res.send(result);
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