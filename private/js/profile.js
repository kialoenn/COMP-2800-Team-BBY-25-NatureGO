$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (users) {
        if (users) {
            let u = {
                id: users.uid
            };
            console.log(u);
            $.ajax({
                url: "/get-name",
                type: "POST",
                data: u,
                success: function (data) {
                    t2 = '<p>';
                    t2 += data;
                    t2 += '</p>';

                    let div = $("#userinfo");
                    div.html(t2);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $("#p1").text(jqXHR.statusText);
                    console.log("ERROR:", jqXHR, textStatus, errorThrown);
                }
            });
        } else {
            window.location.href = "/html/login.html";

        }


    });
});

$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (users) {
        if (users) {
            let u = {
                id: users.uid
            };
            console.log(u);
            $.ajax({
                url: "/get-email",
                type: "POST",
                data: u,
                success: function (data) {
                    t2 = data
                    console.log(t2);
                    let div = $("#content");
                    div.html(t2);

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $("#p1").text(jqXHR.statusText);
                    console.log("ERROR:", jqXHR, textStatus, errorThrown);
                }
            });
        } else {
            window.location.href = "/html/login.html";

        }


    });
});

var storage = firebase.storage();

function uploadUserProfilePic() {
    // Let's assume my storage is only enabled for authenticated users 
    // This is set in your firebase console storage "rules" tab

    firebase.auth().onAuthStateChanged(function (user) {
        var fileInput = document.getElementById("mypic-input"); // pointer #1
        const image = document.getElementById("mypic-goes-here"); // pointer #2

        // listen for file selection
        fileInput.addEventListener('change', function (e) {
            var file = e.target.files[0];
            var blob = URL.createObjectURL(file);
            image.src = blob; // display this image

            //store using this name
            var storageRef = storage.ref("images/" + user.uid + ".jpg");

            //upload the picked file
            storageRef.put(file)
                .then(function () {
                    console.log('Uploaded to Cloud Storage.');
                })

            //get the URL of stored file
            storageRef.getDownloadURL()
                .then(function (url) { // Get URL of the uploaded file
                    console.log(url); // Save the URL into users collection
                    db.collection("users").doc(user.uid).update({
                            "profilePic": url
                        })
                        .then(function () {
                            console.log('Added Profile Pic URL to Firestore.');
                        })
                })
        })
    })
}
uploadUserProfilePic();

function displayUserProfilePic() {
    firebase.auth().onAuthStateChanged(function (user) { //get user object
        db.collection("users").doc(user.uid) //use user's uid
            .get() //READ the doc
            .then(function (doc) {
                var picUrl = doc.data().profilePic; //extract pic url

                // use this line if "mypicdiv" is a "div"
                //$("#mypicdiv").append("<img src='" + picUrl + "'>")

                // use this line if "mypic-goes-here" is an "img" 
                $("#mypic-goes-here").attr("src", picUrl);
            })
    })
}
displayUserProfilePic();



// grabs and displays all user info
function getUserInfo() {
    firebase.auth().onAuthStateChanged(function (users) {
        if (users) {
            //console.log(users.uid);
            db.collection("users").doc(users.uid)
                .get()
                .then(function (doc) {
                    // grabs data from user doc
                    var name = doc.data().name;
                    var desc = doc.data().description;
                    var mail = doc.data().email;
                    var numb = doc.data().number;
                    var add = doc.data().address;
                    var nick = doc.data().nickname;
                    
                    // displays grabbed data onto page
                    $("#username").val(name).text(name);
                    $("#description").val(desc).text(desc);
                    $("#email").val(mail).text(mail);
                    $("#number").val(numb).text(numb);
                    $("#address").val(add).text(add);
                    $("#nickname").val(nick).text(nick);
                })
        } else {
            
            // No user is signed in.
        }
    });
}
getUserInfo();