document.getElementById("file-input").setAttribute("onchange", "previewFile()");
window.initMap = initMap;
let pos, map, infoWindow;

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
      getGPSLatitudeLongitude(this);
      if (pos === null) {
        //https://developers.google.com/maps/documentation/javascript/examples/map-geolocation#maps_map_geolocation-javascript
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              if (map !== null && infoWindow !== null) {
                infoWindow.close();
                infoWindow = new google.maps.InfoWindow({
                  position: pos,
                });
                infoWindow.setContent(JSON.stringify(pos));
                map.setCenter(pos);
                infoWindow.open(map);
              }
              showUploadBtn();
              // document.getElementById("GPScoor").textContent = JSON.stringify(pos);
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

  console.log("inside initMap");
  //BCIT BBY campus
  let posTemp = {
    lat: 49.25076313248947,
    lng: -123.0017895306895,
  };

  map = new google.maps.Map(document.getElementById("selectImgLocation"), {
    zoom: 12,
    center: posTemp,
    mapTypeId: "terrain",
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
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: posTemp,
    });
    infoWindow.setContent(JSON.stringify(posTemp.toJSON(), null, 2));
    infoWindow.open(map);
    console.log(JSON.stringify(posTemp));

    pos = posTemp.toJSON();
    showUploadBtn(); 
    // document.getElementById("GPScoor").textContent = JSON.stringify(pos);
  });
}

function showUploadBtn() {
  document.getElementById("uploadImgBtn").style.visibility = "visible";
}

export { pos };
