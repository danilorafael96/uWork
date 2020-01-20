var cliId = sessionStorage.getItem("cliId")
var ptId = sessionStorage.getItem("ptId")


function login() {
    var utilizId = document.getElementById("utilizId").value;
    var password = document.getElementById("password").value;
    $.ajax({
        url: "/api/utilizadores/clientes",
        method: "get",
        contentType: "application/json",
        dataType: "json",
        success: function (result, status) {
            var logado = false;
            for (i in result) {
                if (result[i].utiliz_nome == utilizId && result[i].utiliz_password == password) {

                    alert("Login efectuado com sucesso. Bem vindo " + result[i].utiliz_nome)
                    window.location = "homeCliente.html"
                    sessionStorage.setItem("cliId", result[i].cli_id)
                    logado = true;
                }
            }
            if (!logado)
                alert("Username ou Password não coincidem. Por favor preencher de novo.");

        },
        error: function (jqXHR, errStr, errorThrown) {
            console.log(errStr);
        }
    })
}

function loginPt() {
    var utilizId = document.getElementById("utilizId").value;
    var password = document.getElementById("password").value;

    $.ajax({
        url: "/api/pts",
        method: "get",
        contentType: "application/json",
        dataType: "json",
        success: function (result, status) {
            var logado = false;
            for (i in result) {
                if (result[i].utiliz_nome == utilizId && result[i].utiliz_password == password) {
                    alert("Login efectuado com sucesso. Bem vindo " + result[i].utiliz_nome)
                    window.location = "homePT.html"
                    sessionStorage.setItem("ptId", result[i].pts_id)
                    logado = true
                }
            }
            if (!logado)
                alert("Username ou Password não coincidem. Por favor preencher de novo.");

        },
        error: function (jqXHR, errStr, errorThrown) {
            console.log(errStr);
        }
    })
}