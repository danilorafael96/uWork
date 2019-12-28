
window.onload = function () {
    var servicosPt = document.getElementById("servicosPt");
    var servicosLista = document.getElementById("servicos");
    loadServPt(2)
    loadListaServicos()

    function loadServPt(ptId) {
        $.ajax({
            url: "api/pts/" + ptId,
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
                for (i in res.servicos) {
                    var s = res.servicos[i];
                    html += "<li>" + s.serv_nome + "</li>"
                }

                servicosPt.innerHTML = html;

            },
            error: function (jqXHR, errStr, errThrown) {
                console.log(errStr);
            }

        })
    }

    function loadListaServicos() {
        $.ajax({
            url: "api/servicos/",
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
                    html += "<input type='checkbox' name='' value=" + res[i].serv_id + " id=''>" + res[i].serv_nome;
                }

                servicosLista.innerHTML = html;

            },
            error: function (jqXHR, errStr, errThrown) {
                console.log(errStr);
            }
        })
    }
}