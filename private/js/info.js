$(document).ready(function() {

    var info = localStorage.getItem("animalinfo");

    var imageURL = localStorage.getItem("url");

    console.log(imageURL);

    $("#image").attr("src", imageURL);
    
    $('#info_table').prepend('<tr><th>Animal Type</th><td>'+info+'</td></tr>');

    var points = 0;
    switch(info){
        case "Duck":
        points = 200;
        break;
        case "Cat":
        points = 100;
        break;
        case "Bear":
        points = 1000;
        break;
    }
    $("#info_tab").prepend("<h2>Congrats!! You got <b>"+points+" </b>Points</h2>");

});