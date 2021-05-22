import {
  pos
} from "./imageData.js";

$(document).ready(function () {
  $('#imageForm').submit(function (e) {
    e.preventDefault();

    let fd = new FormData(this);
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user.uid);
        console.log(pos);
        for (var [key, value] of fd.entries()) {
          console.log(key, value);
        }
        $.each(pos, function (key, value) {
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
              calcpoints(user.uid, r.type).then(function (s) {
                console.log("result", r);
                localStorage.setItem('animalinfo', r.type);
                localStorage.setItem('url', r.url);
                window.location.href = "/html/info.html";
              });

            } else if (r.status == 'error') {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'We cannot identify animal in the picture, please upload another one',
              }).then(function () {
                window.location.href = "/html/index.html";
              })
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'This animal is already in your collection.',
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

/**
 * Function to calulcate points and update userpoints.
 */

async function calcpoints(user, animaltype) {
  let points = 0;
  let userpoints = await getpoints();
  let rarity = await getrarity(animaltype);
 

  switch (rarity) {
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

  console.log(points);
  localStorage.setItem('points', points);

  let total_points = userpoints + points;
  await updatepoints(user,total_points);
}

/**
 * Function to get current user .
 */
function getpoints() {
  return new Promise(function (res, rej) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        db.collection("users").
        doc(user.uid).get()
          .then(function (doc) {
            res(doc.data().totalpoints);
          });
      }
    })
  })

}

/**
 * Function to get rarity of animal.
 */

function getrarity(animaltype) {
  return new Promise(function (res, rej) {
    db.collection("animals_info").where("name", "==", animaltype)
      .get()
      .then((querySnapshot) => {

        querySnapshot.forEach((doc) => {
          res(doc.data().rarity)
        });
      })

  })

}

/**
 * Function to Update userpoints.
 */

 function updatepoints(user,points) {
  return new Promise(function (res, rej) {
    var dbref = db.collection('users').doc(user);
    dbref.update({
      totalpoints:points
    }).then(function (){
      res("Success");
    })

  })

}