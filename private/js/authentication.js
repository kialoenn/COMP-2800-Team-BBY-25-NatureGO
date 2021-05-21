/**
 * Check if user is login or not, direct to login page if not.
 */
 function checkUserStatus() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            window.location.href = "/html/login.html";
        } else {
            $('#authentication').html('<a class="nav-link right-s-nav" title="camera" id = "logout">logout</a>');
            $('#logout').css({'cursor': 'pointer'});
            $('#logout').on('click', function(e) {
                e.preventDefault();
                logOut();
            });
        }
    });
}
checkUserStatus();

function logOut() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}