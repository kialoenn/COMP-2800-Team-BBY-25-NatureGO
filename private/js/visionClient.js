$(document).ready(function() {
    $('#imageForm').submit(function(e) {
        e.preventDefault();

        let fd = new FormData(this);
        let uid;
        firebase.auth().onAuthStateChanged(function(user) {
            uid = user.uid;
        })

        let formData = {
            pic: fd,
            id: uid
        }
        $.ajax({
            type: "POST",
            url: "/upload",
            data: formData,
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
    })
})