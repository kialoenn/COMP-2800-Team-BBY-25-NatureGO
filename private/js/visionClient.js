/**
 * This is the server file that commuicates between client and firesbase database
 * @author Man Sun, Michael Wang, Neeraj Kumar
 * */
import { pos } from "./imageData.js";

$(document).ready(function () {
  $('#imageForm').submit(function (e) {
    e.preventDefault();

    let fd = new FormData(this);
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
  
        $.each(pos, function (key, value) {
          fd.append(key, value);
        });
        
        fd.append('id', user.uid);
        swal.fire(
          {
            title: "Checking...",
            text: "Please wait",
            imageUrl: "/img/loading.gif",
            showConfirmButton: false,
            allowOutsideClick: false
          }
        )
        $.ajax({
          type: "POST",
          url: "/upload",
          data: fd,
          processData: false,
          contentType: false,
          success: function (r) {
            // console.log(r);
            if (r.status == 'success') {
              calcpoints(user.uid, r.type).then(function (s) {
                Swal.fire({
                  title: "New Finding!",
                  text: "Congratulations, You earned " + s + " points!",
                  icon: "success",
                  allowOutsideClick: false,
                }).then((result) => {
                  if (result.isConfirmed) {
                    localStorage.setItem('animalinfo', r.type);
                    localStorage.setItem('url', r.url);
                    window.location.href = "/html/info.html";
                  }
                })
              });

            } else if (r.status == 'error') {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "It's either in your collectoin, or we cannot identify it",
              }).then(function () {
                window.location.href = "/html/upload.html";
              })
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "It's either in your collectoin, or we cannot identify it",
              }).then(function () {
                window.location.href = "/html/upload.html";
              })
            }

          },
          error: function (e) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "It's either in your collectoin, or we cannot identify it",
            }).then(function () {
              window.location.href = "/html/upload.html";
            });
          }
        });
      }
    });
  });
});

/**
 * Function to calulcate points and update userpoints.
 */

async function calcpoints(user, animaltype) {
  let points = 0;
  let userpoints = await getpoints();
  let rarity = await getrarity(animaltype);
 
  // console.log(userpoints);

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

  // console.log(points);
  localStorage.setItem('points', points);
  if(userpoints == undefined){
    userpoints = 0;
  }

  // console.log(userpoints);

  let total_points = userpoints + points;
  await updatepoints(user,total_points);
  return points;
}

/**
 * Function to get current user .
 */
function getpoints() {
  return new Promise(function (res, rej) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        db.collection("users")
        .doc(user.uid).get()
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
      // console.log("update db points");
      res("Success");
    })

  })

}