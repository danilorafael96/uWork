var cliId = sessionStorage.getItem("cliId");

window.onload = function () {

    carregaListaSubscricoes();

}

//Esta função carrega as informações de subscrição do cliente.
function carregaListaSubscricoes() {

    var subscricoes = document.getElementById("subscricoes");

    $.ajax({
        url: "/api/clientes/" + cliId + "/subscricoes",
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
                if (res[i].estado_id == 3)
                    html += "<img src='" + res[i].utiliz_imagem + "' alt='' onclick='carregaPt(" + res[i].pts_id + ")'><p>Personal trainer: " + res[i].utiliz_nome + "</p><p>Serviço: " + res[i].serv_nome + "</p><p>Localização: " + res[i].pts_localTreino + "</p><p>Estado da subscrição: " + res[i].estado_nome + "</p><p>Data de início: " + res[i].subs_dataHora_inicio + "</p><p>Data de fim: " + res[i].subs_dataHora_fim + "</p>"
                if (res[i].estado_id == 2)
                    html += "<img src='" + res[i].utiliz_imagem + "' alt='' onclick='carregaPt(" + res[i].pts_id + ")'><p>Personal trainer: " + res[i].utiliz_nome + "</p><p>Serviço: " + res[i].serv_nome + "</p><p>Localização: " + res[i].pts_localTreino + "</p><p>Estado da subscrição: " + res[i].estado_nome + "</p><p>Data de início: " + res[i].subs_dataHora_inicio + "</p>"
            }
            subscricoes.innerHTML = html;
        },
        error: function (jqXHR, errStr, errThrown) {
            console.log(errStr);
        }
    })
}

// Logo após clicar na imagem do personal trainer,esta função muda de página e carrega o id do pt que é recebido como parâmetro.
function carregaPt(pts_id) {
    sessionStorage.setItem("ptId", pts_id);
    window.location.href = "P_Trainer.html";
}