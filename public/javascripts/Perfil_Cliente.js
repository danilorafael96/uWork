var cliId=sessionStorage.getItem("cliId");

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
            url:"/api/clientes/"+ cliId,
            method:"get",
            contentType: "aplication/json",
            dataType: "json",
            success: function (res, status, jqXHR) {
                console.log(status);
                if (res.err) {
                    console.log(JSON.stringify(res));
                    return;
                }
                
                for(i in res){
                    imagem.src=res[i].utiliz_imagem
                    nome.innerHTML="<p>Nome: "+res[i].utiliz_nome+"</p>"
                    email.innerHTML="<p>Email: "+res[i].utiliz_email+"</p>"
                    datansc.innerHTML="<p>Data de nascimento: "+res[i].utiliz_dtnsc+"</p>"
                    sexo.innerHTML="<p>Sexo: "+res[i].utiliz_sexo+"</p>"
                    morada.innerHTML="<p>Morada: "+res[i].cli_morada+"</p>"
                }
            },
            error: function (jqXHR, errStr, errThrown) {
                console.log(errStr);
            }
        })
    }
}