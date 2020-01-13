var cliId=sessionStorage.getItem("cliId");

window.onload = function () {
    var subscricoes = document.getElementById("subscricoes");

    loadSubs();

    function loadSubs() {
        $.ajax({
            url: "/api/clientes/"+cliId+"/subscricoes",
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
                for (i in res) {
                    //html += "<li onclick='openPt(" + res[i].pts_id + ")'>"+res[i].estado_nome+"</li>"
                    html+="<tr> <th onclick='openPt(" + res[i].pts_id + ")'> <img src='"+res[i].utiliz_imagem+"' alt='imagem'></th></tr> <tr><td>-"+res[i].utiliz_nome+"</td></tr> <tr><td>-"+res[i].serv_nome+"</td></tr> <tr><td>-"+res[i].pts_localTreino+"</td></tr> <tr><td>-"+res[i].estado_nome+"</td></tr>"
                }
                subscricoes.innerHTML = html;
            },
            error: function (jqXHR, errStr, errThrown) {
                console.log(errStr);
            }
        })
    }
}

function openPt(pts_id) {
	sessionStorage.setItem("ptId", pts_id);
	window.location.href = "P_Trainer.html";
}