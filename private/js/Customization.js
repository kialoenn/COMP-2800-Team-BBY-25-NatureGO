// users collection in database
const userRef = db.collection('users');

// the submit button in the html
const submitButton = document.getElementById('profileForm');


// edits the user's profile information in the database
function submitProfileInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        var newEntry = userRef.doc(user.uid);

        $('#profileForm').on('submit', function (e) {
            e.preventDefault();
            //console.log("updata")
            // grabs the user's input values
            var xusername = document.getElementById('username').value;
            var xnickname = document.getElementById('nickname').value;
            var xnumber = document.getElementById('number').value;
            var xdescription = document.getElementById('description').value;
            var xaddress = document.getElementById('address').value;

            // console.log(xnickname)
            // updates the user document with more information
            newEntry.update({
                name: xusername,
                nickname: xnickname,
                description: xdescription,
                number: xnumber,
                address: xaddress
            })

            // console.log("Data was uploaded!")
            // short delay after submitting to show the 'weight' of the action
            setTimeout(function () {
               window.location.assign("profile.html?location"); 
            }, 500);
        })
    })
}
submitProfileInfo();


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