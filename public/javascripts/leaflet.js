var loc = [38.7071382,-9.15238686328902];
console.log("Start");
window.onload = function () {
	console.log("Loaded");
    var mymap = L.map('mapid').setView([51.05, -0,09], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1IjoiZHJhZmFlbCIsImEiOiJjazJxMnBlb3IwNzg3M25tb21ncjZzNmRrIn0.5qpXqrTCKD6ouYStFOHygA'
}).addTo(mymap);
var marker = L.marker(51.05, -0,09).addTo(mymap);
var circle = L.circle([51.508, -0.11], radius, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);



}


