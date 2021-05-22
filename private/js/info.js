$(document).ready(function () {
    var points = 0;
    var rarity;

    //Getting the animal name from local storage..
    var animaltype = localStorage.getItem("animalinfo");
    //Getting the Image URL from local storage..
    var imageURL = localStorage.getItem("url");

    var points = localStorage.getItem("points");

    console.log(points);


    $("#image").attr("src", imageURL);

    /**
     * Function to dispaly the animal information .
     */
    function getanimalinfo() {
        return new Promise(function (res, rej) {
            db.collection("animals_info").where("name", "==", animaltype)
                .get()
                .then((querySnapshot) => {

                    querySnapshot.forEach((doc) => {
                        $('#info_table').append('<tr><th>Name</th><td>' + doc.data().name + '</td></tr>');
                        $('#info_table').append('<tr><th>Family</th><td>' + doc.data().family + '</td></tr>');
                        $('#info_table').append('<tr><th>Endangered</th><td>' + doc.data().endangered + '</td></tr>');
                        $('#info_table').append('<tr><th>Population</th><td>' + doc.data().population + '</td></tr>');
                        $('#info_table').append('<tr><th>Habitat</th><td>' + doc.data().habitat + '</td></tr>');
                        $('#info_table').append('<tr><th>Fun Fact</th><td>' + doc.data().funfact + '</td></tr>');

                        res(doc.data().rarity)
                    });
                })
        })
    }

    /**
     * Function to caluclate points and display them .
     */
    async function calcpoints() {

        let rarity = await getanimalinfo();
        let userdata = await getpoints();

        console.log(userdata);
        switch (rarity) {
            case "epic":
                points = 1000;
                break;
            case "rare":
                points = 500;
                break;
            case "common":
                points = 200;
                break;
        }
        $("#info_tab").prepend("<h2>Congrats!! You got <b>" + points + " </b>Points</h2>");

        let total_points = userdata.points + points ;
        console.log(total_points);

        db.collection('users').doc(userdata.id).update({
            totalpoints:total_points
        });
    }
    calcpoints();

    /**
     * Function to get existing user points.
     */
    function getpoints() {
        return new Promise(function (res, rej) {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    db.collection("users").
                    doc(user.uid).get()
                        .then(function (doc) {
                           let data ={
                               "id":user.uid,
                               "points":doc.data().totalpoints
                          };
                          res(data);
                        });
                }
            })
        })

    }
    getanimalinfo();
    $("#info_tab").prepend("<h2>Congrats!! You got <b>" + points + " </b>Points</h2>");

});