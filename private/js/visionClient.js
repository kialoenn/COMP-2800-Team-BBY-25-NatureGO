import {pos} from "./imageData.js";

$(document).ready(function() {

    $('#imageForm').submit(function(e) {
        e.preventDefault();

      let fd = new FormData(this);
      console.log(pos);

        for (var [key, value] of fd.entries()) { 
          console.log(key, value);
        }
        $.each(pos, function(key, value) {
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