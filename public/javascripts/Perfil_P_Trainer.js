
window.onload=function(){
    var nome=document.getElementById("nome");
    var email=document.getElementById("email");
    var datansc=document.getElementById("datansc");
    var morada=document.getElementById("morada");

    loadDados(1);

    function loadDados(ptId){
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
                var html="<p>"+res.utiliz_nome+"</p>"
                var html1="<p>"+res.utiliz_email+"</p>"
                var html2="<p>"+res.utiliz_dtnsc+"</p>"
                var html3="<p>"+res.pts_localTreino+"</p>"
                
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