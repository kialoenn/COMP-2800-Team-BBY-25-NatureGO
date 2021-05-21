import { pos } from "./imageData.js";

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
    });
  });
});
