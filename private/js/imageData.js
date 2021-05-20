//author: Michael W
document.getElementById("selectImgLocation").style.visibility = "hidden";
document.getElementById("file-input").setAttribute("onchange", "previewFile()");
window.initMap = initMap;
let pos, map;

//preview replace image
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
      let latLongCoord = getGPSLatitudeLongitude(this);
      if (pos !== null) {
        document.getElementById("GPScoor").textContent = JSON.stringify(latLongCoord);
      } else {
        document.getElementById("GPScoor").textContent = "No GPS from Image!";

        //from google map API sample
        //check for device geolocation
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              if (map !== null) {
                let infoWindow = new google.maps.InfoWindow({
                  position: pos,
                });
                infoWindow.setContent(
                  JSON.stringify(pos)
                  );
                  map.setCenter(pos);
                infoWindow.open(map);
              }
              document.getElementById("GPScoor").textContent = JSON.stringify(pos);
            },
            //user has geolocation but unable to get GPS
            initMap()
          );
        } else {
          //user don't have geolocation
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
//https://developers.google.com/maps/documentation/javascript/examples/map-geolocation#maps_map_geolocation-javascript
function initMap() {
  document.getElementById("selectImgLocation").style.visibility = "visible";

  console.log("inside initMap");
  let posTemp = {
    lat: 49.25076313248947,
    lng: -123.0017895306895
  };

  map = new google.maps.Map(document.getElementById("selectImgLocation"), {
    zoom: 11,
    center: posTemp,
  });
  // Create the initial InfoWindow.
  let infoWindow = new google.maps.InfoWindow({
    content: "Click the map to get Lat/Lng!",
    position: posTemp,
  });
  infoWindow.open(map);
  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    posTemp = mapsMouseEvent.latLng;
    // Close the current InfoWindow.
    infoWindow.close();
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: posTemp,
    });
    infoWindow.setContent(
      JSON.stringify(posTemp.toJSON(), null, 2)
    );
    infoWindow.open(map);
    console.log(JSON.stringify(posTemp));

    pos = posTemp.toJSON();
    document.getElementById("GPScoor").textContent = JSON.stringify(pos);
  });
}

export { pos };
