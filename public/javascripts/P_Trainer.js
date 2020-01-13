var loc = [38.7071382, -9.15238686328902];
console.log("Start");

var ptId = sessionStorage.getItem("ptId");
var cliId = sessionStorage.getItem("cliId");

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


    var imagem = document.getElementById("imagem");
    var nome = document.getElementById("nomePt")
    var descricao = document.getElementById("descricao");
    var servicosPT = document.getElementById("servicosPT");



    loadPtInfo(imagem, nome, descricao, servicosPT);
    Subscrever();

    function loadPtInfo(img, nomePt, desc, serv) {
        $.ajax({
            url: "/api/pts/" + ptId,
            method: "get",
            contentType: "application/json",
            dataType: "json",
            success: function (res, status, jqXHR) {
                console.log(status);
                if (res.err) {
                    console.log(JSON.stringify(res));
                    return;
                }
                img.src = res.utiliz_imagem;
                nomePt.innerHTML = res.utiliz_nome;
                desc.innerHTML = res.pts_descricao;

                var html = "";
                for (i in res.servicos) {
                    var servicos = res.servicos[i];
                    html += "<input type='checkbox' name='servico' value='" + servicos.servpts_id + "' id='servPt'>" + servicos.serv_nome;
                }
                serv.innerHTML = html;
            },
            error: function (jqXHR, errStr, errThrown) {
                console.log(errStr);
            }
        })
    }
}

function Subscrever() {
    var servPt = document.getElementById("servPt");
    $.ajax({
        url: "/api/clientes/" + cliId + "/subscricoes",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({
            cliId: cliId,
            servPt: servPt.value
        }),
        success: function (data, status) {
            window.location = "Servicos_Cliente.html"
        }
    })
}

/*
function Subscrever(cliId) {
    //var servico= document.getElementById("servico");
    var servicos=document.forms[0];
    var servicosLista = [];
    for(var i=0;i<servicos.length;i++){
        if(servicos[i].checked){
            servicosLista[i]=servicos[i].value
        }
    }
    $.ajax({
        url: "/api/clientes/" + cliId + "/subscricoes",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({
            servicosChecked: servicosLista,
            personalTrainer: ptId
        }),
        success: function (data, status) {
            window.location = "/Servicos_Cliente.html"
        }
    })
}*/