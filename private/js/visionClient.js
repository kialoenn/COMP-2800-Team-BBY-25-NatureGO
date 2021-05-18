import {getGPSLatitudeLongitude} from "./imageData.js";

$(document).ready(function() {

    $('#imageForm').submit(function(e) {
        e.preventDefault();

      let file = document.querySelector("input[type=file]").files[0];
      let gpsPOS = getGPSLatitudeLongitude(file);
      let fd = new FormData(this);
      console.log(gpsPOS);
        for (var [key, value] of fd.entries()) { 
          console.log(key, value);
        }
        $.each(gpsPOS, function(key, value) {
          fd.append(key, value);
        });
        for (var [key, value] of fd.entries()) { 
          console.log(key, value);
        }
        $.ajax({
            type: "POST",
            url: "/upload",
            data: fd,
            processData: false,
            contentType: false,
            success: function(r){
                console.log("result",r);
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