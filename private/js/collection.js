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
                        info += '<div class="col-lg-3 col-md-4 col-6"><a href="#" class="d-block mb-4 h-100"><img class="img-fluid img-thumbnail" src="' +
                            animal.data().url + '" alt=""></a></div>';
                    })
                    $('#pictureContent').html(info);
                    // let snap = doc.data();
                    // let info;
                    // snap.forEach(function (animal) {
                    //     info += '<div class="col-lg-3 col-md-4 col-6"><a href="#" class="d-block mb-4 h-100"><img class="img-fluid img-thumbnail" src="'
                    //      + animal.url + '" alt=""></a></div>';
                    // })
                    // $('#pictureContent').html(info);
                });

            let animalDB = [
                'Black Swift',
                'Cougar',
                'Raccoon',
                'Wolf',
                'Black bear',
                'Canada goose',
                'Coyote',
                'Sockeye salmon',
                'Grass dude long'
            ];

            let label = [
                'Plant',
                'Flower',
                'American black bear',
                'Natural environment',
                'Grizzly bear',
                'Carnivore',
                'Brown bear',
                'Natural landscape',
                'Tree',
                'Grass'
            ]

            animalDB.forEach(animal => {
                if (label.find(function(a) {
                    if (a.length >= animal.length) {
                        return a.toUpperCase().includes(animal.toUpperCase());
                    } else {
                        return animal.toUpperCase().includes(a.toUpperCase());
                    }
                })){
                    console.log('find ' + animal);
                }
            });
        }
    });
});