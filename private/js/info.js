$(document).ready(function() {
    var info = localStorage.getItem("animalinfo");

    $('#info_tabe').prepend('<tr><th>Animal Type</th><td>'+info+'</td></tr>');

    console.log(info);


});