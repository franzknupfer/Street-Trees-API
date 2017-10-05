function initMap(data) {
  let portland = {lat: 45.5231, lng: -122.6765};
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: portland
  });

//   var marker = new google.maps.Marker({
//   position: portland,
//   map: map,
//   title: 'Hello World!'
// });

  placeMarkers(data, map);
}

function placeMarkers(data, map) {
  data = JSON.parse(data)
  data.trees.forEach(function(tree) {
    let latLng = new google.maps.LatLng((parseInt(tree.lat)), (parseint(tree.long));
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    })
    marker.setMap(map);
  });
}

function treeApiCall(neighborhood, common_name) {
  return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `http://localhost:3000/v1/trees?neighborhood=${neighborhood}&common_name=${common_name}`;

    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText))
      }
    }
    request.open("GET", url, true);
    request.send();
  });
}

$(document).ready(function() {

  const script = document.createElement('script');
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBLjRSAAfFIFfQ1prCr2gDuVWpaIWbZV7U"
  document.body.appendChild(script);

  $('#queryParams').click(function() {
    let neighborhood = $('#neighborhood').val();
    let common_name = $('#common_name').val();
    $('#location').val("");
    treeApiCall(neighborhood, common_name).then(function(response) {
      initMap(response);
    });
  });
});
