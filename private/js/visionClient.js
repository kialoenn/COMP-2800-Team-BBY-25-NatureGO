$(document).ready(function() {
    $('#imageForm').submit(function(e) {
        e.preventDefault();

        let fd = new FormData(this);
        console.log(fd)
        $.ajax({
            type: "POST",
            url: "/upload",
            data: fd,
            processData: false,
            contentType: false,
            success: function(r){
                console.log("result",r)
                
            },
            error: function (e) {
                console.log("some error", e);
            }
        });
    })
})