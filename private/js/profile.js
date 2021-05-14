
$(document).ready(function () {
        $.ajax({
            url: "/get-email",
            dataType: "HTML",
            type: "GET",
            
            success: function (mail) {
                t2 = mail
                console.log(t2);
                let div = $("#content");
                div.html(t2);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#p1").text(jqXHR.statusText);
                console.log("ERROR:", jqXHR, textStatus, errorThrown);
            }
        });

});


$(document).ready(function () {
        $.ajax({
            url: "/get-name",
            dataType: "HTML",
            type: "GET",
            
            success: function (user) {
                t2 = '<p>';
                t2 += user;
                t2 += '</p>';

                let div = $("#userinfo");
                div.html(t2);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#p1").text(jqXHR.statusText);
                console.log("ERROR:", jqXHR, textStatus, errorThrown);
            }
        });
    

});