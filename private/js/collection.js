/**
 * This js file is for collections
 * @author Man
 */

$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            window.location.href = "/html/login.html";
        } else {
            db.collection('users').doc(user.uid).collection('animals')
                .get()
                .then(function (doc) {
                    let info = "";
                    doc.forEach(function (animal) {
                        info += '<div class="col-lg-3 col-md-4 col-6"><span class="d-block mb-4 h-100 animalImg" id = "' + animal.data().type + '"><img class="img-fluid img-thumbnail" src="' +
                            animal.data().url + '" alt=""></span></div>';
                    })
                    $('#pictureContent').html(info);
                });

        }
    });

    $('#pictureContent').on('click', 'span', function (e) {
        e.preventDefault();
        let animaltype = $(this).attr('id');
        db.collection("animals_info")
            .where("name", "==", animaltype)
            .get()
            .then((snap) => {
                snap.forEach((doc) => {
                    swal.fire({
                        html: `<table class = "table table-bordered">
                    <tr><th>Name</th><td> ${doc.data().name}</td></tr>
                    <tr><th>Family</th><td>' ${doc.data().family} '</td></tr>
                    <tr><th>Endangered</th><td>'${doc.data().endangered}'</td></tr>
                    <tr><th>Population</th><td>'${doc.data().population}'</td></tr>
                    <tr><th>Habitat</th><td>'${doc.data().habitat}'</td></tr>
                    <tr><th>Fun Fact</th><td>'${doc.data().funfact}'</td></tr>
                    </table>`
                    })
                })
            })

    })

});