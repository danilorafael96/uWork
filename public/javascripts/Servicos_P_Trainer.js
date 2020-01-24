
var ptId = sessionStorage.getItem("ptId");

window.onload = function () {
    var servicosPt = document.getElementById("servicosPt");
    var servicosLista = document.getElementById("servicos");
    loadServPt()
    //loadListaServicos()
    

    function loadServPt() {
        $.ajax({
            url: "api/pts/" + ptId +"/servicos",
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
                    html+= "<li value="+res[i].serv_id+" >" + res[i].serv_nome + "-"+res[i].serv_preco+"€<button onclick='removerServ("+res[i].servpts_id+")'>Remover</button> </li>";
                }
                servicosPt.innerHTML = html;
            },
            error: function (jqXHR, errStr, errThrown) {
                console.log(errStr);
            }
        }),
        $.ajax({
            url: "api/pts/" + ptId +"/servicos_por_adicionar",
            method: "get",
            contentType: "application/json",
            dataType: "json",
            success: function (res, status, jqXHR) {
                console.log(status);
                if (res.err) {
                    console.log(JSON.stringify(res));
                    return;
                }
                var html="";
                for(i in res){
                    html+="<input type='button' name='servico' value='adicionar' onclick='addServ("+res[i].serv_id+","+res[i].serv_preco+")' >" + res[i].serv_nome+"-"+res[i].serv_preco+"€<br><br>";
                }
                servicosLista.innerHTML=html;
            },
            error: function (jqXHR, errStr, errThrown) {
                console.log(errStr);
            }
        })
    }
}

function addServ(servId,preco){
    $.ajax({
        url:"api/pts/"+ptId+"/servicos",
        method:"post",
        contentType:"application/json",
        data:JSON.stringify({
            ptId:ptId,
            servico:servId,
            preco:preco,
        }),
        success: function (data, status) {
            window.location = "Servicos_P_Trainer.html"
        }

    })
}

function removerServ(servPtId){

    $.ajax({
        url:"api/pts/"+ptId+"/servicos",
        method:"delete",
        contentType:"application/json",
        data:JSON.stringify({
            servicoPt:servPtId,
        }),
        success: function (data, status) {
            window.location = "Servicos_P_Trainer.html"
        }

    })
}