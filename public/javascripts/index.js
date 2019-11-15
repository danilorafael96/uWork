var loc = [38.753726, -9.199441];
console.log("Start");
window.onload = function () {
	console.log("Loaded");
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1IjoicmVuYXRvMTYiLCJhIjoiY2sycTN1cG9qMDhnNTNpcWZuNjlxM3phZCJ9.8XcsIyqd9Ejt_0eDYQLCcw'
}).addTo(mymap);
var marker = L.marker(loc).addTo(mymap);
}