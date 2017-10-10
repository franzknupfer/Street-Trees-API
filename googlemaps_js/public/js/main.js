// Next steps:
// * Verify that refactored code is working
// * Nicer map layer
// * Add search options beyond neighborhood and type?

// Current iteration of project
// * Refactored map code and moved into Map class. The goal of this is partly to organize code and partly to allow the query results (which are used for markers and for associating data with markers) to be available within the instantiated object. Still haven't tested it yet.

class Tree {
  constructor() {}

  setProperties(data) {
    Object.keys(data).forEach((key) => {
      this[key] = data[key];
    });
  }
}

class Map {
  constructor(treeData) {
    this.data = JSON.parse(treeData);
    this.trees = [];
    this.map;
    this.bounds;
  }

  initializeMap() {
    let portland = {lat: 45.5231, lng: -122.6765};
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: portland
    });
  }

  processQueryResults() {
    this.data.trees.forEach((treeProps) => {
      let object = new Tree();
      object.setProperties(treeProps);
      this.trees.push(object);
    });
    this.placeMarkers();
  }

  placeMarkers() {
    this.bounds = new google.maps.LatLngBounds();
    this.data.trees.forEach((tree) => {
      this.addMarker(tree);
    });
    this.map.fitBounds(this.bounds);
  }

  addMarker(tree) {
    const image = "../images/green-icon.png";
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(parseFloat(tree.lat), parseFloat(tree.long)),
      icon: image
    });
    marker.id = tree.id;
    let thisMap = this;
    marker.addListener("click", function() {
      thisMap.showInfobox(this.id);
    });
    marker.setMap(this.map);
    this.bounds.extend(marker.getPosition());
  }

  showInfobox(id) {
    let thisMap = this;
    this.trees.forEach((tree) => {
      if (tree["id"] === id) {
        thisMap.displayData(tree);
      };
    });
  }

  displayData(tree) {
    $("#tree-info").html(`
      Common Name: ${tree.common_name}
      Address: ${tree.address}
      Edible: ${tree.edible}
    `);
  }
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

function geocodeAddress(address) {
  $.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}, Portland,OR&key=AIzaSyBLjRSAAfFIFfQ1prCr2gDuVWpaIWbZV7U`).then(function(response) {
    debugger;
    data = JSON.parse(response);
  });
}

$(document).ready(function() {

  const script = document.createElement('script');
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBLjRSAAfFIFfQ1prCr2gDuVWpaIWbZV7U"
  document.body.appendChild(script);

  $('#searchByAddress').click(function() {
    let address = $('#address').val();
    let common_name = $('#common_name').val();
    geocodeAddress(address);
  });

  $('#queryParams').click(function() {
    let neighborhood = $('#neighborhood').val();
    let common_name = $('#common_name').val();
    $('#location').val("");
    treeApiCall(neighborhood, common_name).then(function(treeData) {
      let map = new Map(treeData);
      map.initializeMap();
      map.processQueryResults();
    });
  });
});
