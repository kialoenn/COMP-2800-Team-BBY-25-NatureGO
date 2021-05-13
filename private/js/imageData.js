window.onload=getExif;

function getExif() {
    var img1 = document.getElementById("img1");
    EXIF.getData(img1, function() {
        var make = EXIF.getTag(this, "Make");
        var model = EXIF.getTag(this, "Model");
        var makeAndModel = document.getElementById("makeAndModel");
        makeAndModel.innerHTML = `${make} ${model}`;
        
        console.log(this.exifdata);
        getGPSLatitudeLongitude(this);
    });

    var img2 = document.getElementById("img2");
    EXIF.getData(img2, function() {
        let allMetaData = EXIF.getAllTags(this);
        let allMetaDataSpan = document.getElementById("allMetaDataSpan");
        allMetaDataSpan.innerHTML = JSON.stringify(allMetaData, null, "\t");
        console.log(this.exifdata);
        getGPSLatitudeLongitude(this);
    });

    var img3 = document.getElementById("img3");
    EXIF.getData(img3, function() {
        let allMetaData1 = EXIF.getAllTags(this);
        let allMetaDataSpan1 = document.getElementById("allMetaDataSpan1");
        allMetaDataSpan1.innerHTML = JSON.stringify(allMetaData1, null, "\t");
        console.log(this.exifdata);
        getGPSLatitudeLongitude(this);
    });
}

function getGPSLatitudeLongitude(imgABC){
    if(typeof EXIF.getTag(imgABC, "GPSLatitudeRef") !== "undefined"){
        console.log("GPS Latitude: " + EXIF.getTag(imgABC, "GPSLatitudeRef") + " " + EXIF.getTag(imgABC, "GPSLatitude"));
        console.log("GPS Longitude: " + EXIF.getTag(imgABC, "GPSLongitudeRef") + " " + EXIF.getTag(imgABC, "GPSLongitude"));
    
        console.log(convertDMStoLatLong(EXIF.getTag(imgABC, "GPSLatitude")[0], EXIF.getTag(imgABC, "GPSLatitude")[1], EXIF.getTag(imgABC, "GPSLatitude")[2], EXIF.getTag(imgABC, "GPSLatitudeRef")));
        console.log(convertDMStoLatLong(EXIF.getTag(imgABC, "GPSLongitude")[0], EXIF.getTag(imgABC, "GPSLongitude")[1], EXIF.getTag(imgABC, "GPSLongitude")[2], EXIF.getTag(imgABC, "GPSLongitudeRef")));
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