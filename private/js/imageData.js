/**  
 * Preview & upload picture & GPS data
 * @author Michael Wang
 * */

document.getElementById("file-input").setAttribute("onchange", "previewFile()");
window.initMap = initMap;

//declare variables
let pos;
let map;
let infoWindow;
let markers = [];

//preview image
//from Michael's Term 1 1800 project, Healthy Reminder - profile.js
window.previewFile = function previewFile() {
  let fileImg = document.getElementById("previewImag");
  let file = document.querySelector("input[type=file]").files[0];
  let reader = new FileReader();

  reader.addEventListener("load", () => {
    fileImg.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
    pos = null;

    //exif-js API
    EXIF.getData(file, function () {
      getGPSLatitudeLongitude(this);
      if (pos === null) {
        //get device location
        //https://developers.google.com/maps/documentation/javascript/examples/map-geolocation#maps_map_geolocation-javascript
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              //set marker to device location if map
              if (map !== null && infoWindow !== null) {
                infoWindow.close();
                pickLocationMarker(pos);
                map.setCenter(pos);
              }
              showUploadBtn();
              // document.getElementById("GPScoor").textContent = JSON.stringify(pos);
            },
            //user's device has geolocation but unable to get GPS
            initMap()
          );
        } else {
          //user's device don't have geolocation
          initMap();
        }
      }
    });
  }
}

//check if image has readable GPS from exif
function getGPSLatitudeLongitude(imgABC) {
  if (typeof EXIF.getTag(imgABC, "GPSLatitudeRef") !== "undefined") {
    document.getElementById("selectImgLocation").style.visibility = "hidden";
    pos = {
      //set lat & lng using exif-js API
      lat: convertDMStoLatLong(EXIF.getTag(imgABC, "GPSLatitude")[0], EXIF.getTag(imgABC, "GPSLatitude")[1], EXIF.getTag(imgABC, "GPSLatitude")[2], EXIF.getTag(imgABC, "GPSLatitudeRef")),
      lng: convertDMStoLatLong(EXIF.getTag(imgABC, "GPSLongitude")[0], EXIF.getTag(imgABC, "GPSLongitude")[1], EXIF.getTag(imgABC, "GPSLongitude")[2], EXIF.getTag(imgABC, "GPSLongitudeRef")),
    }
    showUploadBtn();
  }
  return pos;
}

//calculate latitude and longitude from DMS
//https://flyandwire.com/2020/08/10/back-to-basics-latitude-and-longitude-dms-dd-ddm/
function convertDMStoLatLong(hour, minute, second, position) {
  let sixty = 60;
  var GPScoor = hour + ((minute / sixty) + (second / (sixty * sixty)));
  if (position == "S" || position == "W") {
    GPScoor *= -1;
  }
  return GPScoor;
}

//from google map API examples
//https://developers.google.com/maps/documentation/javascript/examples/event-click-latlng
function initMap() {
  document.getElementById("uploadImgBtn").style.visibility = "hidden";
  document.getElementById("selectImgLocation").style.visibility = "visible";

  //default location - BCIT BBY campus
  let posTemp = {
    lat: 49.25076313248947,
    lng: -123.0017895306895,
  };

  map = new google.maps.Map(document.getElementById("selectImgLocation"), {
    zoom: 13,
    center: posTemp,
    mapTypeControl: false,
    streetViewControl: false,
  });
  // Create the initial InfoWindow.
  infoWindow = new google.maps.InfoWindow({
    content: "Click the map to select location",
    position: posTemp,
  });
  infoWindow.open(map);
  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    posTemp = mapsMouseEvent.latLng;
    // Close the current InfoWindow.
    infoWindow.close();
    pickLocationMarker(posTemp);

    pos = posTemp.toJSON();
    showUploadBtn();
  });
}

//select gps location
function pickLocationMarker(posTemp){
  if(markers.length > 0){
    deleteMarkers();
    addMarker(posTemp);
    showMarkers();
  }else if(markers.length == 0){
    addMarker(posTemp);
    showMarkers();
  }else{
    // console.log("ERROR! marker Error!");
  }
}

//https://developers.google.com/maps/documentation/javascript/examples/marker-remove
// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Adds a marker to the map and push to the array.
function addMarker(location) {
  const marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: {
      url: "/img/redIcon.png",
      scaledSize: new google.maps.Size(30, 50),
    },
  });
  markers.push(marker);
}
// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

//display uploadImgBtn
function showUploadBtn() {
  document.getElementById("uploadImgBtn").style.visibility = "visible";
}

export { pos };
