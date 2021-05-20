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
              console.log("result", r);
              localStorage.setItem('animalinfo', r.type);
              localStorage.setItem('url', r.url);
              window.location.href = "/html/info.html";
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