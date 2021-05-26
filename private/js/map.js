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

      //button || tab is clicked
      if(showAllUserPic){
        getGPSallUserPhotLoc(user);
        showAllUserPic = false;
        //reload google map API
      }else{
        getGPScurrentUserPhotoLoc(user);
        showAllUserPic = true;
        //reload google map API
      }
  });
}

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
function getGPSallUserPhotLoc(user){
 db.collectionGroup("animals").where("GPS.lat", "!=", "")
  .get().then(gpsPosit => displayMarker(gpsPosit));
}

function displayMarker(gpsPosit) {
  gpsPosit.forEach((t) => {
    //animal type: "animal"
    console.log(t.data().url);
    console.log("animal: " + JSON.stringify(t.data().type));
    name = JSON.stringify(t.data().type);
    name = name.substring(1, name.length - 1);
    var marker, markerOverview, infow;
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
        content: "<b>" + name + "</b><br/><img src="+ t.data().url +" style='width: 200px; height: 200px;'><br/>",
      });
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
    //infow listener
      //when picture or name is clicked,
      //console.log("result", r);
      //localStorage.setItem('animalinfo', r.type);
      //localStorage.setItem('url', r.url);
      //window.location.href = "/html/info.html";
  });
}
