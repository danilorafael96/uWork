var ptId = sessionStorage.getItem("ptId");

window.onload = function () {

    carregaDadosPt();

}

//Esta função apresenta as informações pessoais do personal trainer.
function carregaDadosPt() {
    var imagem = document.getElementById("imagem");
    var nome = document.getElementById("nome");
    var email = document.getElementById("email");
    var datansc = document.getElementById("datansc");
    var sexo = document.getElementById("sexo");
    var morada = document.getElementById("morada");

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

            for (i in res) {
                imagem.src = res[i].utiliz_imagem;
                nome.innerHTML = "<p>Nome: " + res[i].utiliz_nome + "</p>";
                email.innerHTML = "<p>Email: " + res[i].utiliz_email + "</p>";
                datansc.innerHTML = "<p>Data de nascimento: " + res[i].utiliz_dtnsc + "</p>";
                sexo.innerHTML = "<p>Sexo: " + res[i].utiliz_sexo + "</p>";
                morada.innerHTML = "<p>Morada: " + res[i].pts_localTreino + "</p>";
            }
        },
        error: function (jqXHR, errStr, errThrown) {
            console.log(errStr);
        }
    })
}