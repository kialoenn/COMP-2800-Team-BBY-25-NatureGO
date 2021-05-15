document.getElementById("file-input").setAttribute("onchange", "previewFile()");

//preview replace image
function previewFile() {
  let fileImg = document.getElementById("previewImag");
  var file = document.querySelector("input[type=file]").files[0];
  var reader = new FileReader();

  reader.addEventListener("load", () => {
    fileImg.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);

    EXIF.getData(file, function () {
      let latLongCoord = getGPSLatitudeLongitude(this);
      if (latLongCoord !== undefined) {
        document.getElementById("GPScoor").textContent = JSON.stringify(latLongCoord);
        // console.log(this.exifdata);
      } else {
        document.getElementById("GPScoor").textContent = "No GPS Found!";
      }
    });
  }
}

function getGPSLatitudeLongitude(imgABC) {
  if (typeof EXIF.getTag(imgABC, "GPSLatitudeRef") !== "undefined") {
    const pos = {
      lat: convertDMStoLatLong(EXIF.getTag(imgABC, "GPSLatitude")[0], EXIF.getTag(imgABC, "GPSLatitude")[1], EXIF.getTag(imgABC, "GPSLatitude")[2], EXIF.getTag(imgABC, "GPSLatitudeRef")),
      lng: convertDMStoLatLong(EXIF.getTag(imgABC, "GPSLongitude")[0], EXIF.getTag(imgABC, "GPSLongitude")[1], EXIF.getTag(imgABC, "GPSLongitude")[2], EXIF.getTag(imgABC, "GPSLongitudeRef")),
    };
    return pos;
  }
}

function convertDMStoLatLong(hour, minute, second, position) {
  let sixty = 60;
  var GPScoor = hour + ((minute / sixty) + (second / (sixty * sixty)));
  if (position == "S" || position == "W") {
    GPScoor *= -1;
  }
  return GPScoor;
}

// {"lat":43.46844166666666,"lng":11.881515}

// Note: SKU: Basic Data Using the fields parameter in your Place Details or
//  Find Place request, you can limit the response to only those fields specified. 
//  Fields in the Basic category are included in the base cost of the Places request 
//  and do not result in any additional charge. The Basic Data SKU is triggered when 
//  any of these fields are requested: address_component, adr_address, business_status,
//   formatted_address, geometry, icon, name, permanently_closed, photo, place_id,
//    plus_code, type, url, utc_offset, vicinity.