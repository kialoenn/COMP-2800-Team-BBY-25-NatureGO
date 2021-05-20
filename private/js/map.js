let map;

function initMap() {
  let defaultGPS = {
    lat: 49.25076313248947,
    lng: -123.0017895306895
  };

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
    center: defaultGPS,
    zoom: 13,
  });
}


