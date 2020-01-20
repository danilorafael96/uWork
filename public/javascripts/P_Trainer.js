console.log("Start");

var ptId = sessionStorage.getItem("ptId");
var cliId = sessionStorage.getItem("cliId");
var mymap = L.map('mapid').setView([38.7763839, -9.2649320], 13);



window.onload = function () {

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZHJhZmFlbCIsImEiOiJjazJxMnBlb3IwNzg3M25tb21ncjZzNmRrIn0.5qpXqrTCKD6ouYStFOHygA'
    }).addTo(mymap);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mymap);



    var imagem = document.getElementById("imagem");
    var nome = document.getElementById("nomePt")
    var descricao = document.getElementById("descricao");
    var servicosPT = document.getElementById("servicosPT");



    loadPtInfo(imagem, nome, descricao, servicosPT);
    getLocation()

    function loadPtInfo(img, nomePt, descr, serv) {
        $.ajax({
            url: "/api/pts/" + ptId + "/servicos/clientes/" + cliId,
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
                    img.src = res[0].utiliz_imagem;
                    nomePt.innerHTML = res[0].utiliz_nome;
                    descr.innerHTML = res[0].pts_descricao;
                    if (res[i].subscrito == 1) {
                        html += "<input type='button' name='servico' value='cancelar' onclick='Cancelar(" + res[i].servpts_id + ")'>" + res[i].serv_nome;

                    } else if (res[i].subscrito == 0) {
                        html += "<input type='button' name='servico' value='subscrever' onclick='Subscrever(" + res[i].servpts_id + ")'>" + res[i].serv_nome;
                    }
                }
                serv.innerHTML = html;

            },
            error: function (jqXHR, errStr, errThrown) {
                console.log(errStr);
            }
        })
    }
}

function Cancelar(servPt) {
    $.ajax({
        url: "/api/clientes/" + cliId + "/subscricoes/cancelar",
        method: "put",
        contentType: "application/json",
        data: JSON.stringify({
            cliId: cliId,
            servPt: servPt
        }),
        success: function (data, status) {
            window.location = "Servicos_Cliente.html"
        }
    })
}

function Subscrever(servPt) {
    $.ajax({
        url: "/api/clientes/" + cliId + "/subscricoes",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({
            cliId: cliId,
            servPt: servPt
        }),
        success: function (data, status) {
            window.location = "Servicos_Cliente.html"
        }
    })
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(showRoute);
}

function showRoute(position) {

    $.ajax({
        url: '/api/utilizadores/personalTrainers/' + ptId,
        method: 'get',
        contentType: "application/json", // sending in json
        dataType: "json",// receiving in json
        success: function (res, status) {

            for (i in res) {
                console.log(res[i]);
                L.Routing.control({
                    waypoints: [
                        L.latLng(res[i].pts_lat, res[i].pts_long),
                        L.latLng(position.coords.latitude, position.coords.longitude)
                    ],
                    routeWhileDragging: false,
                    draggableWaypoints: false,
                    addWaypoints: false,
                }).addTo(mymap);
            }
        }
    })
}
