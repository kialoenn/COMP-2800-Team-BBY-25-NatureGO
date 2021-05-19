document.getElementById("selectImgLocation").style.visibility = "hidden";

document.getElementById("file-input").setAttribute("onchange", "previewFile()");
window.initMap = initMap;

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

    EXIF.getData(file, function () {
      let latLongCoord = getGPSLatitudeLongitude(this);
      if (latLongCoord !== undefined) {
        document.getElementById("GPScoor").textContent = JSON.stringify(latLongCoord);
      } else {
        document.getElementById("GPScoor").textContent = "No GPS Found!";
      }
    });
  }
}
let pos;
function getGPSLatitudeLongitude(imgABC) {
  if (typeof EXIF.getTag(imgABC, "GPSLatitudeRef") !== "undefined") {
    document.getElementById("selectImgLocation").style.visibility = "hidden";
    pos = {
      lat: convertDMStoLatLong(EXIF.getTag(imgABC, "GPSLatitude")[0], EXIF.getTag(imgABC, "GPSLatitude")[1], EXIF.getTag(imgABC, "GPSLatitude")[2], EXIF.getTag(imgABC, "GPSLatitudeRef")),
      lng: convertDMStoLatLong(EXIF.getTag(imgABC, "GPSLongitude")[0], EXIF.getTag(imgABC, "GPSLongitude")[1], EXIF.getTag(imgABC, "GPSLongitude")[2], EXIF.getTag(imgABC, "GPSLongitudeRef")),
    } 
  }else {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        };
      console.log("Current Location: " + pos);
    },
      //geoError()
      initMap()
    );
  } else {
    //geoError();
    initMap();
  }
}
    return pos;
  }

function convertDMStoLatLong(hour, minute, second, position) {
  let sixty = 60;
  var GPScoor = hour + ((minute / sixty) + (second / (sixty * sixty)));
  if (position == "S" || position == "W") {
    GPScoor *= -1;
  }
  return GPScoor;
}

export {pos};

function geoError(){
  console.log("trying to init map!");
  document.getElementById("selectImgLocation").style.visibility = "visible";
}

// Note: SKU: Basic Data Using the fields parameter in your Place Details or
//  Find Place request, you can limit the response to only those fields specified. 
//  Fields in the Basic category are included in the base cost of the Places request 
//  and do not result in any additional charge. The Basic Data SKU is triggered when 
//  any of these fields are requested: address_component, adr_address, business_status,
//   formatted_address, geometry, icon, name, permanently_closed, photo, place_id,
//    plus_code, type, url, utc_offset, vicinity.

function initMap() {
  document.getElementById("selectImgLocation").style.visibility = "visible";

  console.log("inside initMap");
  let posTemp = {
    lat: 49.25076313248947,
    lng: -123.0017895306895
  };
  const map = new google.maps.Map(document.getElementById("selectImgLocation"), {
    zoom: 8,
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
  });

}
