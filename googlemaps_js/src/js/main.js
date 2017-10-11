import { Map } from './map.js'
import $ from 'jquery'
import '../css/styles.css'

function treeApiCall (neighborhood, commonName) {
  return new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest()
    let url = `http://localhost:3000/v1/trees?`
    if (neighborhood !== '') {
      url += `neighborhood=${neighborhood}`
    }
    if (commonName !== '') {
      url += `&common_name=${commonName}`
    }
    request.onload = function () {
      if (this.status === 200) {
        resolve(request.response)
      } else {
        reject(Error(request.statusText))
      }
    }
    request.open('GET', url, true)
    request.send()
  })
}

function geocodeAddress (address) {
  $.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address},Portland,OR&key=AIzaSyBLjRSAAfFIFfQ1prCr2gDuVWpaIWbZV7U`).then(function (response) {
    data = JSON.parse(response)
  })
}

$(document).ready(function () {
  const script = document.createElement('script')
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBLjRSAAfFIFfQ1prCr2gDuVWpaIWbZV7U'
  document.body.appendChild(script)

  $('#searchByAddress').click(function () {
    let address = $('#address').val()
    let commonName = $('#commonName').val()
    geocodeAddress(address)
  })

  $('#queryParams').click(function () {
    let neighborhood = $('#neighborhood').val()
    let commonName = $('#commonName').val()
    $('#location').val('')
    treeApiCall(neighborhood, commonName).then(function (treeData) {
      let map = new Map(treeData)
      map.initializeMap()
      map.processQueryResults()
    })
  })
})
