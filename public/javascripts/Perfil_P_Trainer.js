var ptId = sessionStorage.getItem("ptId");

window.onload=function(){
    var imagem=document.getElementById("imagem");
    var nome=document.getElementById("nome");
    var email=document.getElementById("email");
    var datansc=document.getElementById("datansc");
    var sexo=document.getElementById("sexo");
    var morada=document.getElementById("morada");

    loadDados();

    function loadDados(){
        $.ajax({
            url:"/api/pts/"+ ptId,
            method:"get",
            contentType: "aplication/json",
            dataType: "json",
            success: function (res, status, jqXHR) {
                console.log(status);
                if (res.err) {
                    console.log(JSON.stringify(res));
                    return;
                }
                imagem.src = res.utiliz_imagem
                nome.innerHTML = "<p>Nome: " + res.utiliz_nome + "</p>"
                email.innerHTML = "<p>Email: " + res.utiliz_email + "</p>"
                datansc.innerHTML = "<p>Data de nascimento: " + res.utiliz_dtnsc + "</p>"
                sexo.innerHTML = "<p>Sexo: " + res.utiliz_sexo + "</p>"
                morada.innerHTML = "<p>Morada: " + res.pts_localTreino + "</p>"
            },
            error: function (jqXHR, errStr, errThrown) {
                console.log(errStr);
            }
        })
    }
}