let map;

function initMap() {
  let defaultGPS = {
    lat: 49.25076313248947,
    lng: -123.0017895306895
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        defaultGPS = pos;
        map.setCenter(defaultGPS);
      }
    );
  }
  map = new google.maps.Map(document.getElementById('mapAPI'), {
    center: defaultGPS,
    zoom: 13,
  });
}

$(document).ready(function () {
  firebase.auth().onAuthStateChanged(function (users) {
      if (users) {
          let u = {
              id: users.uid
          };
          console.log(u);
          $.ajax({
              url: "/get-gps",
              type: "POST",
              data: u,
              success: function (data) {;
                  t2 = data;
                  console.log("data: " + data);
              },
              error: function (jqXHR, textStatus, errorThrown) {
                  console.log("ERROR:", jqXHR, textStatus, errorThrown);
              }
          });
      } else {
          window.location.href = "/html/login.html";
      }

  });
});


