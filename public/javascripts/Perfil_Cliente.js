
window.onload=function(){
    var dados=document.getElementById("dados");

    loadDados();

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
                for(i in res){
                    html="<li>"+res[i].utiliz_nome+"</li>"
                }
                dados.innerHTML=html;
            },
            error: function (jqXHR, errStr, errThrown) {
                console.log(errStr);
            }
        })
    }
}