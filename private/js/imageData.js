//window.onload=getExif;

function getExif() {
    let imgNum = document.getElementsByTagName("img").length;

    for(let i = 1; i <= imgNum; i++){
        let img = document.getElementById("img" + i);
        EXIF.getData(img, function() {
            let latLongCoord = getGPSLatitudeLongitude(this);
            if(latLongCoord !== undefined){
                document.getElementById("GPScoor" + i).textContent = JSON.stringify(latLongCoord);     
                // console.log(this.exifdata);
            } else {
                document.getElementById("GPScoor" + i).textContent = "No GPS Found!";
            }
        });
    }
}

function getGPSLatitudeLongitude(imgABC){
    if(typeof EXIF.getTag(imgABC, "GPSLatitudeRef") !== "undefined"){
       const pos = {
            lat: convertDMStoLatLong(EXIF.getTag(imgABC, "GPSLatitude")[0], EXIF.getTag(imgABC, "GPSLatitude")[1], EXIF.getTag(imgABC, "GPSLatitude")[2], EXIF.getTag(imgABC, "GPSLatitudeRef")),
            lng: convertDMStoLatLong(EXIF.getTag(imgABC, "GPSLongitude")[0], EXIF.getTag(imgABC, "GPSLongitude")[1], EXIF.getTag(imgABC, "GPSLongitude")[2], EXIF.getTag(imgABC, "GPSLongitudeRef")),
        };
        return pos;
    }
}

function convertDMStoLatLong(hour, minute, second, position){
    let sixty = 60;
    var GPScoor = hour + ((minute/sixty) + (second/sixty*sixty));
    if(position == "S" || position == "W"){
        GPScoor *= -1;
    }
    return GPScoor;
}
getExif();
// Note: SKU: Basic Data Using the fields parameter in your Place Details or
//  Find Place request, you can limit the response to only those fields specified. 
//  Fields in the Basic category are included in the base cost of the Places request 
//  and do not result in any additional charge. The Basic Data SKU is triggered when 
//  any of these fields are requested: address_component, adr_address, business_status,
//   formatted_address, geometry, icon, name, permanently_closed, photo, place_id,
//    plus_code, type, url, utc_offset, vicinity.