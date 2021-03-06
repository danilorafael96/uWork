var loc = [38.7071382, -9.15238686328902];
console.log("Start");

var ptId = sessionStorage.getItem("ptId")
var listaClientes;

window.onload = function () {

    console.log("Loaded");
    var mymap = L.map('mapid').setView(loc, 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZHJhZmFlbCIsImEiOiJjazJxMnBlb3IwNzg3M25tb21ncjZzNmRrIn0.5qpXqrTCKD6ouYStFOHygA'
    }).addTo(mymap);

    listaClientes = document.getElementById("listaClientes");

    carregaClientes();
    marcadorCliente();

    //Função que adiciona o marcador de cada cliente subscrito ao mapa.
    function marcadorCliente() {
        $.ajax({
            url: '/api/pts/' + ptId + '/subscricoes',
            method: 'get',
            contentType: "application/json",
            dataType: "json",
            success: function (res, status) {
                var marker;
                for (i in res) {

                    marker = L.marker(
                        L.latLng(
                            parseFloat(res[i].cli_lat),
                            parseFloat(res[i].cli_long)

                        )
                    );
                    marker.addTo(mymap).bindPopup(res[i].cli_morada).openPopup();


                }
            }
        })
    }
}

//Função que permite carregar a lista de clientes subscritos à um personal trainers.
function carregaClientes() {
    $.ajax({
        url: "api/pts/" + ptId + "/subscricoes",
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
            for (i in res) {
                html += "<img src=" + res[i].utiliz_imagem + " alt='' style='width:120px'><p>Nome:" + res[i].utiliz_nome + "</p><p>Morada:" + res[i].cli_morada + "</p><p>Serviço:" + res[i].serv_nome + "</p><p>Estado:" + res[i].estado_nome + "</p><br>";
            }
            listaClientes.innerHTML = html;
        },
        error: function (jqXHR, errStr, errThrown) {
            console.log(errStr);
        }
    })
}

