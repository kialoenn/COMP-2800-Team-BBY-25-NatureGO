
$(document).ready(function () {

    setInterval(ajaxCall, 5000);
    function ajaxCall(){
        $.ajax({
            url: "/get-customers",
            dataType: "HTML",
            type: "GET",
            
            success: function (mail) {
                t2 = mail
                let div = $("#information");
                div.html(t2);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#p1").text(jqXHR.statusText);
                console.log("ERROR:", jqXHR, textStatus, errorThrown);
            }
        });
    }

});