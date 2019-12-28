var loc = [38.7071382, -9.15238686328902];
console.log("Start");

window.onload = function () {

    console.log("Loaded");
    var mymap = L.map('mapid').setView(loc, 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZHJhZmFlbCIsImEiOiJjazJxMnBlb3IwNzg3M25tb21ncjZzNmRrIn0.5qpXqrTCKD6ouYStFOHygA'
    }).addTo(mymap);
    var marker = L.marker(loc).addTo(mymap);

    var listaClientes= document.getElementById("listaClientes");

    loadListaClientes(2);

    function loadListaClientes(ptId){
        $.ajax({
            url:"api/pts/"+ptId+"/subscricoes",
            method: "get",
            contentType: "application/json",
            dataType: "json",
            success: function (res, status, jqXHR) {
                console.log(status);
                if (res.err) {
                    console.log(JSON.stringify(res));
                    return;
                }

                var html = "";
                for (i in res.clientes) {
                    var clientes = res.clientes[i];
                    html += "<li><img src=" + clientes.utiliz_imagem + " alt='' style='width:120px'>"+clientes.estado_nome+" </li>";
                }
                listaClientes.innerHTML = html;
            },
            error: function (jqXHR, errStr, errThrown) {
                console.log(errStr);
            }
        })
    }
}