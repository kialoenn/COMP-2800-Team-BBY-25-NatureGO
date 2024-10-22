/**
 * Displaying location via GPS and basic animal information
 * @author Michael Wang
 * */

//https://developers.google.com/maps/documentation/javascript/examples/inset-map#maps_inset_map-javascript
let map, overview;
//change to false to see only user profile (didn't have enough time to implement)
let showAllUserPic = true;
const OVERVIEW_DIFFERENCE = 5;
const OVERVIEW_MIN_ZOOM = 3;
const OVERVIEW_MAX_ZOOM = 10;

//initialize google map
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
    //get curent device location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          defaultGPS = pos;
          map.setCenter(defaultGPS);
        });
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

    //link overview window with main window
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
        ));
    });

    //button || tab is clicked
    if (showAllUserPic) {
      getGPSallUserPhotLoc(user);
      showAllUserPic = false;
      //reload google map API
    } else {
      getGPScurrentUserPhotoLoc(user);
      showAllUserPic = true;
      //reload google map API
    }
  });
}

//string to float
function strGeoCoorToFloatPt(geoStr) {
  let geoFloatPoint = parseFloat(geoStr.substring(1, geoStr.length - 1));
  return geoFloatPoint;
}

//get current user's photos in DB with GPS coordinates
function getGPScurrentUserPhotoLoc(user) {
  db.collection("users").doc(user.uid).collection("animals").where("GPS.lat", "!=", "")
    .get().then(gpsPosit => displayMarker(gpsPosit));
}

//get all users' photo in DB with GPS coordinates
function getGPSallUserPhotLoc(user) {
  db.collectionGroup("animals").where("GPS.lat", "!=", "")
    .get().then(gpsPosit => displayMarker(gpsPosit));
}

//display marker
function displayMarker(gpsPosit) {
  gpsPosit.forEach((t) => {

    //animal type: "animal"
    name = JSON.stringify(t.data().type);
    name = name.substring(1, name.length - 1);
    var marker, markerOverview, infow;

    //string to floating point number
    let lat = strGeoCoorToFloatPt(JSON.stringify(t.data().GPS.lat));
    let lng = strGeoCoorToFloatPt(JSON.stringify(t.data().GPS.lng));

    gpsCoord = {
      lat: lat,
      lng: lng,
    }
    
    //check if map & overview already loaded
    if (map !== null && overview !== null) {
      imageSizeConst = 250;
      infow = new google.maps.InfoWindow({
        content: "<b>" + name + "</b><br/><img src=" + t.data().url + " style='width: 200px; height: 200px;'><br/>",
      });

      //main map
      marker = new google.maps.Marker({
        position: gpsCoord,
        map: map,
        // icon: greenIcon,
        icon: {
          url: "/img/redIcon.png",
          scaledSize: new google.maps.Size(30, 50),
        },
        title: name,
      });

      //overview map
      markerOverview = new google.maps.Marker({
        position: gpsCoord,
        map: overview,
        // icon: greenIcon,
        icon: {
          url: "/img/redIcon.png",
          scaledSize: new google.maps.Size(10, 17),
        },
        title: name,
      });
    }

    marker.addListener("click", () => {
      infow.open(map, marker);
    });
  });
}
