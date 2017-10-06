// Next steps:
// * Verify that refactored code is working
// * Find tree icon and use for marker
// * Set bounds based on trees populated on map
// * Add info window with further data
// * Nicer map layer
// * Add search options beyond neighborhood and type?

class Tree {
  constructor() {}

  setProperties(data) {
    Object.keys(data).forEach((key) => {
      this[key] = data[key];
    });
  }
}

function processQueryResults(data) {
  data = JSON.parse(data);
  results_array = [];
  data.trees.forEach(function(treeProps) {
    let object = new Tree();
    object.setProperties(treeProps);
    results_array.push(object);
  });
  return results_array;
}

function treeApiCall(neighborhood, common_name) {
  return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `http://localhost:3000/v1/trees?`;
    if (neighborhood !== "") {
      url += `neighborhood=${neighborhood}`
    }
    if (common_name !== "") {
      url += `&common_name=${common_name}`;
    }
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

function initMap(data) {
  let portland = {lat: 45.5231, lng: -122.6765};
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: portland
  });
  placeMarkers(data, map);
}

function placeMarkers(data, map) {
  data = JSON.parse(data);
  let bounds = new google.maps.LatLngBounds();
  data.trees.forEach(function(tree) {
    addMarker(tree, map, bounds);
  });
  map.fitBounds(bounds);
}

function addMarker(data, map, bounds) {
  const image = "public/green-icon.png";
  let marker = new google.maps.Marker({
    position: new google.maps.LatLng(parseFloat(data.lat), parseFloat(data.long)),
    icon: image
  });
  marker.id = data.id;
  marker.addListener("click", function() {
    showData(this.id);
  });
  marker.setMap(map);
  bounds.extend(marker.getPosition());
}

function showData(id) {
  for (tree of results_array) {
    if (tree["id"] === id) {
      displayData(tree);
      break;
    }
  }
}

function displayData(tree) {
  $("#tree-info").html(`
    Common Name: ${tree.common_name}
    Address: ${tree.address}
    Edible: ${tree.edible}
  `);
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
      let results = processQueryResults(response);
      initMap(response);
      return results;
    });
  });
});
