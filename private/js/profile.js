



$(document).ready(function () {
            firebase.auth().onAuthStateChanged(function (users) {
                    if (users) {
                        let u = users.uid;
                        console.log(u);
                        $.ajax({
                            url: "/get-name",
                            type: "POST",
                            data: u,
                            success: function (data) {
                                console.log(data)
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                $("#p1").text(jqXHR.statusText);
                                console.log("ERROR:", jqXHR, textStatus, errorThrown);
                            }
                        });
                    } else {
                        window.location.href = "/html/login.html";

                    }

                   
                });
            });
        