//https://developers.google.com/maps/documentation/javascript/examples/inset-map#maps_inset_map-javascript
let map, overview;
let showAllUserPic = true;
const OVERVIEW_DIFFERENCE = 5;
const OVERVIEW_MIN_ZOOM = 3;
const OVERVIEW_MAX_ZOOM = 10;


function initMap() {
  firebase.auth().onAuthStateChanged(function (user) {
    let defaultGPS = {
      lat: 49.25076313248947,
      lng: -123.0017895306895,
    };

    const mapOptionsSetting = {
      center: defaultGPS,
      zoom: 13,
      mapTypeControl: false,
      streetViewControl: false,
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

    // instantiate the overview map without controls
    overview = new google.maps.Map(document.getElementById("overview"), {
      ...mapOptionsSetting,
      disableDefaultUI: true,
      gestureHandling: "none",
      zoomControl: false,
    });

    function clamp(num, min, max) {
      return Math.min(Math.max(num, min), max);
    }
    map.addListener("bounds_changed", () => {
      overview.setCenter(map.getCenter());
      overview.setZoom(
        clamp(
          map.getZoom() - OVERVIEW_DIFFERENCE,
          OVERVIEW_MIN_ZOOM,
          OVERVIEW_MAX_ZOOM
        )
      );
    });
    if (showAllUserPic) {
      getGPSallUserPhotLoc(user);
    } else {
      getGPScurrentUserPhotoLoc(user);
    }

  });
}

function strGeoCoorToFloatPt(geoStr) {
  let geoFloatPoint = parseFloat(geoStr.substring(1, geoStr.length - 1));
  return geoFloatPoint;
}

//get current user's photos in DB with none empty GPS coordinates
function getGPScurrentUserPhotoLoc(user) {
  db.collection("users").doc(user.uid).collection("animals").where("GPS.lat", "!=", "")
    .get().then(gpsPosit => {
      displayMarker(gpsPosit)
    });
}

function getGPSallUserPhotLoc(user) {

  db.collectionGroup("animals").where("GPS.lat", "!=", "")
    .get().then(gpsPosit => {
      console.log(gpsPosit);
      displayMarker(gpsPosit)
    });
  // Do something with these reviews!

  //   db.collection("users")
  //   .get().then(snap => {
  //     snap.forEach(thing => {
  //       thing.collection("animal").where("GPS.lat", "!=", "")
  //       .get().then(gpsPosit => {
  //         console.log(gpsPosit);
  //         console.log({gpsPosit});
  //         // displayMarker(gpsPosit)});
  //     });
  //   });
  // });
  // doc(user.uid).collection("animals").where("GPS.lat", "!=", "")
  // .get().then(gpsPosit => {displayMarker(gpsPosit)});
}


function displayMarker(gpsPosit) {
  gpsPosit.forEach((t) => {
    //animal type: "animal"
    console.log(t.data().url);
    console.log("animal: " + JSON.stringify(t.data().type));
    name = JSON.stringify(t.data().type);
    name = name.substring(1, name.length - 1);
    var marker, markerOverview, infow;
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
    if (map !== null && overview !== null) {
      imageSizeConst = 250;
      infow = new google.maps.InfoWindow({
        content: "<b>" + name + "</b><br/><img src=" + t.data().url + " style='width: 200px; height: 200px;'><br/>",
        // maxWidth: 250,
      });
      marker = new google.maps.Marker({
        position: gpsCoord,
        map: map,
        // icon: greenIcon,
        title: name,
      });
      markerOverview = new google.maps.Marker({
        position: gpsCoord,
        map: overview,
        // icon: greenIcon,
        title: name,
      });
    }
    marker.addListener("click", () => {
      infow.open(map, marker);
    });
  });
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