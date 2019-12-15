//var loc = [38.7071382, -9.15238686328902];
console.log("Start");
//
console.log("Loaded");
var mymap = L.map('mapid').setView([38.7763839, -9.2649320], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZHJhZmFlbCIsImEiOiJjazJxMnBlb3IwNzg3M25tb21ncjZzNmRrIn0.5qpXqrTCKD6ouYStFOHygA'
}).addTo(mymap);


window.onload = function () {
    markerPT()
}
function markerPT() {
    $.ajax({
        url: '/api/registers/',
        method: 'get',
        contentType: "application/json", //sending in json
        dataType: "json", // receiving in json
        success: function (res, status) {
            console.log("teste")
            var marker;
            for (i in res) {
                
                marker = L.marker(
                    L.latLng(
                        parseFloat(res[i].pts_lat),
                        parseFloat(res[i].pts_long)
                    )
                );
                marker.addTo(mymap);

            }


        }

    })
}


