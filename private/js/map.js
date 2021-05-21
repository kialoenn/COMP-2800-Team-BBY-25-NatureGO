//https://developers.google.com/maps/documentation/javascript/examples/inset-map#maps_inset_map-javascript
let map, overview;
// const OVERVIEW_DIFFERENCE = 5;
// const OVERVIEW_MIN_ZOOM = 3;
// const OVERVIEW_MAX_ZOOM = 10;


function initMap() {
  let defaultGPS = {
    lat: 49.25076313248947,
    lng: -123.0017895306895,
  };

  const mapOptionsSetting = {
    center: defaultGPS,
    zoom: 13,
  }
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
    ...mapOptionsSetting,
  });

  // // instantiate the overview map without controls
  // overview = new google.maps.Map(document.getElementById("overview"), {
  //   ...mapOptionsSetting,
  //   disableDefaultUI: true,
  //   gestureHandling: "none",
  //   zoomControl: false,
  // });

  // function clamp(num, min, max) {
  //   return Math.min(Math.max(num, min), max);
  // }
  // map.addListener("bounds_changed", () => {
  //   overview.setCenter(map.getCenter());
  //   overview.setZoom(
  //     clamp(
  //       map.getZoom() - OVERVIEW_DIFFERENCE,
  //       OVERVIEW_MIN_ZOOM,
  //       OVERVIEW_MAX_ZOOM
  //     )
  //   );
  // });
}

//get current user's photos in DB with none empty GPS coordinates
function getGPScurrentUserPhotoLoc() {
  db.collection("users").doc("2B02XrEUFLglZfThUas1fsPQ6R43").collection("animals").where("GPS.lat", "!=", "")
    .get().then((gpsPosit) => {
      gpsPosit.forEach((t) => {
        //animal type: "animal"
        console.log("animal: " + JSON.stringify(t.data().type));
        name = JSON.stringify(t.data().type);
        var marker;
        // var infoContentName = '<div class="infoContent">' + '<h5 class="firstHeading">' + name + '</h5>' + "</div>";
        //{"lng":"string","lat":"string"}
        console.log("gps: " + JSON.stringify(t.data().GPS));
        //"string"
        let lat = strGeoCoorToFloatPt(JSON.stringify(t.data().GPS.lat));
        let lng = strGeoCoorToFloatPt(JSON.stringify(t.data().GPS.lng));
    
        //floating point number
        console.log(lat + ", " + typeof lat);
        console.log(lng + ", " + typeof lng);
    
        gpsCoord = {
          lat: lat,
          lng: lng,
        }
        if (map !== null) {
          const infow = new google.maps.InfoWindow({
            content: name,
            maxWidth: 200,
          });
          marker = new google.maps.Marker({
            position: gpsCoord,
            map: map,
            // icon: greenIcon,
            title: name,
          });
        }
        marker.addListener("click", () => {
          infow.open(map, marker);
        });
      });
    });
}

getGPScurrentUserPhotoLoc();

function strGeoCoorToFloatPt(geoStr) {
  let geoFloatPoint = parseFloat(geoStr.substring(1, geoStr.length - 1));
  return geoFloatPoint;
}
// $(document).ready(function () {
//   firebase.auth().onAuthStateChanged(function (users) {
//       if (users) {
//           let u = {
//               id: users.uid
//           };
//           console.log(u);
//           $.ajax({
//               url: "/get-gps",
//               type: "POST",
//               data: u,
//               processData: false,
//               contentType: false,
//               success: function (pos) {

//                 for(let i = 0; i < pos.size; i++){
//                   console.log({pos});
//                   console.log("gps: " + pos[i].data());
//                   console.log("lat: " + pos[i].data().lat +", lng: " + pos[i].data().lng);
//                 };

//                 console.log("data: " + pos);

//                 for(let i = 0; i < pos.size; i++){
//                   // console.log({pos});
//                   console.log("Xlat: " + pos[i].lat + ", Xlng: " + pos[i].lng);
//                 };
//               },
//               error: function (jqXHR, textStatus, errorThrown) {
//                   console.log("ERROR:", jqXHR, textStatus, errorThrown);
//               }
//           });
//       } else {
//           window.location.href = "/html/login.html";
//       }

//   });
// });


