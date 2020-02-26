
var ptId = sessionStorage.getItem("ptId");

window.onload = function () {

    carregaServicosPt()
    carregaServicosPorAdd()
    
}

// Função que carrega a lista de serviços associados ao personal trainer que está logado.
function carregaServicosPt() {
        
    var servicosPt = document.getElementById("servicosPt");

    $.ajax({
        url: "api/pts/" + ptId + "/servicos",
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
                html += "<li value=" + res[i].serv_id + " >" + res[i].serv_nome + "-" + res[i].serv_preco + "€<button onclick='removeServico(" + res[i].servpts_id + ")'>Remover</button> </li>";
            }
            servicosPt.innerHTML = html;
        },
        error: function (jqXHR, errStr, errThrown) {
            console.log(errStr);
        }
    })
}

// Esta função apresenta a lista de serviços não adicionados pelo personal trainer.
function carregaServicosPorAdd() {

    var servicosLista = document.getElementById("servicos");

    $.ajax({
        url: "api/pts/" + ptId + "/servicos_por_adicionar",
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
                html += "<input type='button' name='servico' value='adicionar' onclick='adicionaServico(" + res[i].serv_id + "," + res[i].serv_preco + ")' >" + res[i].serv_nome + "-" + res[i].serv_preco + "€<br><br>";
            }
            servicosLista.innerHTML = html;
        },
        error: function (jqXHR, errStr, errThrown) {
            console.log(errStr);
        }
    })
}

/* A função adiciona um novo serviço para o pt logado e recebe como parâmetros o id do serviço e o seu preço.
Se sucesso, é apresentada a mesma página com a informação alterada.
*/
function adicionaServico(servId, preco) {
    $.ajax({
        url: "api/pts/" + ptId + "/servicos",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({
            ptId: ptId,
            servico: servId,
            preco: preco,
        }),
        success: function (data, status) {
            //window.location = "Servicos_P_Trainer.html"
            carregaServicosPt()
            carregaServicosPorAdd()
                
        }

    })
}

/* Esta função recebe o id do serviço associado ao pt logado para ser removido.
Se sucesso, é apresentada a mesma página com a informação alterada.
*/
function removeServico(servPtId) {

    $.ajax({
        url: "api/pts/" + ptId + "/servicos",
        method: "delete",
        contentType: "application/json",
        data: JSON.stringify({
            servicoPt: servPtId,
        }),
        success: function (data, status) {
            //window.location = "Servicos_P_Trainer.html"
            carregaServicosPt()
            carregaServicosPorAdd()
            
        }

    })
}