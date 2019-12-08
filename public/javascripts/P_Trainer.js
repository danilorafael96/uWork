var loc = [38.7071382, -9.15238686328902];
console.log("Start");

var ptId = sessionStorage.getItem("ptId");

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


    var img = document.getElementById("imagem");
    var descr = document.getElementById("descricao");
    var servs = document.getElementById("servicosPT");

    loadPtInfo(img, descr, servs);
    subscreve();

    function loadPtInfo() {
        $.ajax({
            url: "/api/pts/" + ptId,
            method: "get",
            contentType: "aplication/json",
            dataType: "json",
            success: function (res, status, jqXHR) {
                console.log(status);
                if (res.err) {
                    console.log(JSON.stringify(res));
                    return;
                }

                var html = "";
                var html2 = "";
                var html3 = "";

                for (i in res) {
                    html = "<img src=" + res[i].utiliz_imagem + " alt='personalTrainer'>";
                    html2 = "<p style='float: left;' id='descricao'>" + res[i].pts_descricao + "</p>";
                    html3 = "<input type='checkbox' name='serviço' value='' id='servico'>" + res[i].serv_nome;
                }
                img.innerHTML = html;
                descr.innerHTML = html2;
                servs.innerHTML = html3;
            },
            error: function (jqXHR, errStr, errThrown) {
                console.log(errStr);
            }
        })
    }

    function subscreve() {
        var subs = document.getElementById("servico").value;
        
        $.ajax({
            url: "/api/servicos/",
            method: "post",
            contentType: "aplication/json",
            data: JSON.stringify({
                subs: subs
            })
        })
    }
}