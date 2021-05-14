window.onload=getExif;

function getExif() {
    var img1 = document.getElementById("img1");
    EXIF.getData(img1, function() {
        // var make = EXIF.getTag(this, "Make");
        // var model = EXIF.getTag(this, "Model");
        // var makeAndModel = document.getElementById("makeAndModel");

        makeAndModel.innerHTML = `${getGPSLatitudeLongitude(this)}`;
        
        console.log(this.exifdata);
        
    });

    var img2 = document.getElementById("img2");
    EXIF.getData(img2, function() {
        // let allMetaData = EXIF.getAllTags(this);
        // let allMetaDataSpan = document.getElementById("allMetaDataSpan");
        // allMetaDataSpan.innerHTML = JSON.stringify(allMetaData, null, "\t");
        console.log(this.exifdata);
        getGPSLatitudeLongitude(this);
    });

    var img3 = document.getElementById("img3");
    EXIF.getData(img3, function() {
        console.log(this.exifdata);
        getGPSLatitudeLongitude(this);
    });
}

function getGPSLatitudeLongitude(imgABC){
    if(typeof EXIF.getTag(imgABC, "GPSLatitudeRef") !== "undefined"){
        // console.log("GPS Latitude: " + EXIF.getTag(imgABC, "GPSLatitudeRef") + " " + EXIF.getTag(imgABC, "GPSLatitude"));
        // console.log("GPS Longitude: " + EXIF.getTag(imgABC, "GPSLongitudeRef") + " " + EXIF.getTag(imgABC, "GPSLongitude"));
    
        const pos = {
            lat: convertDMStoLatLong(EXIF.getTag(imgABC, "GPSLatitude")[0], EXIF.getTag(imgABC, "GPSLatitude")[1], EXIF.getTag(imgABC, "GPSLatitude")[2], EXIF.getTag(imgABC, "GPSLatitudeRef")),
            lng: convertDMStoLatLong(EXIF.getTag(imgABC, "GPSLongitude")[0], EXIF.getTag(imgABC, "GPSLongitude")[1], EXIF.getTag(imgABC, "GPSLongitude")[2], EXIF.getTag(imgABC, "GPSLongitudeRef")),
        };
        return pos;
    }else{
        console.log("NO GPS metadata!");
    }
}

function convertDMStoLatLong(hour, minute, second, position){
    var GPScoor = hour + ((minute/60) + (second/3600));
    if(position == "S" || position == "W"){
        GPScoor *= -1;
    }
    return GPScoor;
}

// Note: SKU: Basic Data Using the fields parameter in your Place Details or
//  Find Place request, you can limit the response to only those fields specified. 
//  Fields in the Basic category are included in the base cost of the Places request 
//  and do not result in any additional charge. The Basic Data SKU is triggered when 
//  any of these fields are requested: address_component, adr_address, business_status,
//   formatted_address, geometry, icon, name, permanently_closed, photo, place_id,
//    plus_code, type, url, utc_offset, vicinity.