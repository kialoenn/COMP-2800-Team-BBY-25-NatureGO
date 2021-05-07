let map;

function initMap() {
map = new google.maps.Map(document.getElementById('mapAPI'), {
    center: {
    lat: 49.25076313248947,
    lng: -123.0017895306895
    },
    zoom: 13,
});

}