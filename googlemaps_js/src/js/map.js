/* global google */
import { Tree } from './tree.js'
import $ from 'jquery'
import GreenIcon from '../images/green-icon.png'

export class Map {
  constructor (treeData) {
    this.data = JSON.parse(treeData)
    this.trees = []
  }

  initializeMap () {
    let portland = {lat: 45.5231, lng: -122.6765}
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: portland
    })
  }

  processQueryResults () {
    this.data.trees.forEach((treeProps) => {
      let object = new Tree()
      object.setProperties(treeProps)
      this.trees.push(object)
    })
    this.placeMarkers()
  }

  placeMarkers () {
    this.bounds = new google.maps.LatLngBounds()
    this.data.trees.forEach((tree) => {
      this.addMarker(tree)
    })
    this.map.fitBounds(this.bounds)
  }

  addMarker (tree) {
    const image = GreenIcon
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(parseFloat(tree.lat), parseFloat(tree.long)),
      icon: image
    })
    marker.id = tree.id
    let thisMap = this
    marker.addListener('click', function () {
      thisMap.showInfobox(this.id)
    })
    marker.setMap(this.map)
    this.bounds.extend(marker.getPosition())
  }

  showInfobox (id) {
    let thisMap = this
    this.trees.forEach((tree) => {
      if (tree['id'] === id) {
        thisMap.displayData(tree)
      }
    })
  }

  displayData (tree) {
    $('#tree-info').html(`
      Common Name: ${tree.common_name}
      Address: ${tree.address}
      Edible: ${tree.edible}
    `)
  }
}
