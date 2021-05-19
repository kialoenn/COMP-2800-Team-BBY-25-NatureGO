import {
    getGPSLatitudeLongitude
} from "./imageData.js";

$(document).ready(function () {

    $('#imageForm').submit(function (e) {
        e.preventDefault();

        let fd = new FormData(this);
        let uid;
        firebase.auth().onAuthStateChanged(function (user) {
            uid = user.uid;
        })

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
        console.log(uid);
        fd.append('id', uid);

        $.ajax({
            type: "POST",
            url: "/upload",
            data: fd,
            processData: false,
            contentType: false,
            success: function (r) {
                console.log("result", r);
                localStorage.setItem('animalinfo', r.type);
                localStorage.setItem('url', r.url);
                window.location.href = "/html/info.html";
            },
            error: function (e) {
                console.log("some error", e);
            }
        });
    });

});