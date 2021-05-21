import {
    getGPSLatitudeLongitude
} from "./imageData.js";

$(document).ready(function () {

    $('#imageForm').submit(function (e) {
        e.preventDefault();

        let fd = new FormData(this);
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log(user.uid);

                let file = document.querySelector("input[type=file]").files[0];
                let gpsPOS = getGPSLatitudeLongitude(file);
                console.log(gpsPOS);
                for (var [key, value] of fd.entries()) {
                    console.log(key, value);
                }
                $.each(gpsPOS, function (key, value) {
                    fd.append(key, value);
                });
                for (var [key, value] of fd.entries()) {
                    console.log(key, value);
                }
                fd.append('id', user.uid);

                $.ajax({
                    type: "POST",
                    url: "/upload",
                    data: fd,
                    processData: false,
                    contentType: false,
                    success: function (r) {
                        console.log(r);
                        if (r.status == 'success') {
                            calcpoints(user.uid);
                            console.log("result", r);
                            localStorage.setItem('animalinfo', r.type);
                            localStorage.setItem('url', r.url);
                            window.location.href = "/html/info.html";
                          
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'We cannot identify animal in the picture, please upload another one',
                            }).then(function () {
                                window.location.href = "/html/index.html";
                            })
                        }

                    },
                    error: function (e) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'We cannot identify animal in the picture, please upload another one',
                        }).then(function () {
                            window.location.href = "/html/index.html";
                        })
                    }
                });
            }
        })


    });

});

async function calcpoints(user){
    let points = 0;
    let userdata = await getpoints();

    console.log(userdata);

    switch (userdata.rarity) {
        case "epic":
            points = 1000;
            break;
        case "rare":
            points = 500;
            break;
        case "common":
            points = 200;
            break;
    }

    let total_points = userdata.points + points ;

    db.collection('users').doc(user.uid).update({
        totalpoints:total_points
    });

    localStorage.setItem('points', points);

}

function getpoints() {
    return new Promise(function (res, rej) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                db.collection("users").
                doc(user.uid).get()
                    .then(function (doc) {
                       let data ={
                           "rarity":doc.data().rarity,
                           "points":doc.data().totalpoints
                      };
                      res(data);
                    });
            }
        })
    })

}