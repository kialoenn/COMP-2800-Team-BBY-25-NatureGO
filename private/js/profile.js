



$(document).ready(function () {
            firebase.auth().onAuthStateChanged(function (users) {
                    if (users) {
                        let u = {id:users.uid};
                        console.log(u);
                        $.ajax({
                            url: "/get-name",
                            type: "POST",
                            data: u,
                            success: function (data) {
                                t2 = '<p>';
                                t2 += data;
                                t2 += '</p>';
                
                                let div = $("#userinfo");
                                div.html(t2);
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


$(document).ready(function () {
            firebase.auth().onAuthStateChanged(function (users) {
                    if (users) {
                        let u = {id:users.uid};
                        console.log(u);
                        $.ajax({
                            url: "/get-email",
                            type: "POST",
                            data: u,
                            success: function (data) {
                                t2 = data
                                console.log(t2);
                                let div = $("#content");
                                div.html(t2);
                                
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
        
        