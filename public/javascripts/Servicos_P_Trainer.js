var ptId = sessionStorage.getItem("ptId");

window.onload = function () {
    var servicosPt = document.getElementById("servicosPt");
    var servicosLista = document.getElementById("servicos");
    loadServPt()
    loadListaServicos()
    addServicos()

    function loadServPt() {
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
                    //if (res[i].serv_nome !== servicosPt)
                        html += "<input type='checkbox' name='' value=" + res[i].serv_id + " id='servicos'>" + res[i].serv_nome;
                }

                console.log(servicosPt)

                servicosLista.innerHTML = html;

            },
            error: function (jqXHR, errStr, errThrown) {
                console.log(errStr);
            }
        })
    }
}

/////dúvida por tirar
function novosServicos(){
    var servicos=document.getElementById("servicos");

    $.ajax({
        url:"api/pts/"+ptId,
        method:"post",
        contentType:"application/json",
        data:JSON.stringify({
            ptId:ptId,
            servicos:servicos.value,
        }),
        success: function (data, status) {
            window.location = "Servicos_P_Trainer.html"
        }

    })
}
