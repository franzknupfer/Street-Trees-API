// function initMap(data) {
//   let portland = {lat: 45.5231, lng: -122.6765};
//   let map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 12,
//     center: portland
//   });
//   placeMarkers(data, map);
// }
//
// function addMarker(lat, long, map) {
//   console.log(long, lat);
//   let marker = new google.maps.Marker({
//     position: new google.maps.LatLng(long, lat),
//     map: map
//   });
// }
//
// function placeMarkers(data, map) {
//   data = JSON.parse(data)
//   data.trees.forEach(function(tree) {
//     addMarker(parseFloat(tree.lat), parseFloat(tree.long));
//   });
// }
//
// function treeApiCall(neighborhood, common_name) {
//   return new Promise(function(resolve, reject) {
//     let request = new XMLHttpRequest();
//     let url = `http://localhost:3000/v1/trees?neighborhood=${neighborhood}&common_name=${common_name}`;
//
//     request.onload = function() {
//       if (this.status === 200) {
//         resolve(request.response);
//       } else {
//         reject(Error(request.statusText))
//       }
//     }
//     request.open("GET", url, true);
//     request.send();
//   });
// }

$(document).ready(function() {

  const script = document.createElement('script');
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBLjRSAAfFIFfQ1prCr2gDuVWpaIWbZV7U"
  document.body.appendChild(script);

  function initMap(data) {
    let portland = {lat: 45.5231, lng: -122.6765};
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: portland
    });
    placeMarkers(data, map);
  }

  function addMarker(lat, long, map) {
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, long)
    });
    marker.setMap(map);
  }

  function placeMarkers(data, map) {
    data = JSON.parse(data)
    data.trees.forEach(function(tree) {
      addMarker(parseFloat(tree.lat), parseFloat(tree.long), map);
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

  $('#queryParams').click(function() {
    let neighborhood = $('#neighborhood').val();
    let common_name = $('#common_name').val();
    $('#location').val("");
    treeApiCall(neighborhood, common_name).then(function(response) {
      initMap(response);
    });
  });
});
