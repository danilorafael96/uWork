
window.onload=function(){
    var nome=document.getElementById("nome");
    var email=document.getElementById("email");
    var datansc=document.getElementById("datansc");
    var morada=document.getElementById("morada");

    loadDados(1);

    function loadDados(cliId){
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
                var html="";
                var html1="";
                var html2="";
                var html3="";
                for(i in res){
                    html="<p>"+res[i].utiliz_nome+"</p>"
                    html1="<p>"+res[i].utiliz_email+"</p>"
                    html2="<p>"+res[i].utiliz_dtnsc+"</p>"
                    html3="<p>"+res[i].cli_morada+"</p>"
                }
                nome.innerHTML=html;
                email.innerHTML=html1;
                datansc.innerHTML=html2;
                morada.innerHTML=html3;
            },
            error: function (jqXHR, errStr, errThrown) {
                console.log(errStr);
            }
        })
    }
}