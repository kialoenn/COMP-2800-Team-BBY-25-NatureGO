$(document).ready(function () {

    db.collection("users").where("totalpoints", ">", 0)
    .orderBy("totalpoints","desc")
    .limit(10)
    .get().then(function (snap){
        snap.forEach((doc) => {
                console.log(doc.data());
        });
    })
})