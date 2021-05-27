/**
 * Display the leaderboard
 * @author Neeraj
 * @author Richard
 */
$(document).ready(function () {

    db.collection("users").where("totalpoints", ">", 0)
        .orderBy("totalpoints", "desc")
        .limit(10)
        .get().then(function (snap) {
            var list = "<ol id='list'>";
            snap.forEach((doc) => {
                console.log(doc.data());
                list += "<li><mark>" + doc.data().name + "</mark>";
                list += "<small>" + doc.data().totalpoints + "</small></li>";
            })
            list += "</ol>";
            $("#ldrbrd").append(list);
        })

})