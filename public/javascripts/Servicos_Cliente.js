
window.onload = function () {
    var ptSubscricao = document.getElementById("ptSubscricao");

    loadSubs(1);

    function loadSubs(cliId) {
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
                    html += "<li onclick='openPt(" + res[i].pts_id + ")'><img src="+ res[i].utiliz_imagem +" alt='personalTrainer'>"+res[i].serv_nome+" "+res[i].est_nome+"</li>"
                }
                ptSubscricao.innerHTML = html;
            },
            error: function (jqXHR, errStr, errThrown) {
                console.log(errStr);
            }
        })
    }
}

function openPt(pts_id) {
	sessionStorage.setItem("ptId", pts_id);
	window.location.href = "P_trainer.html";
}