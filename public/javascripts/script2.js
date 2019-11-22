
window.onload=function(){
    var servicos =document.getElementById("nomeServicos");
    loadListaServicos();

    function loadListaServicos(){
        $.ajax({
		url:"/api/servicos",
		method:"get",
		contentType:"aplication/json",
		dataType:"json",
		sucess: function(res,status,jqXHR){
			console.log(status);
			if(res.err){
				console.log(JSON.stringify(res));
				return;
			}
			var html="";
			for(i in res){
				html +="<li>" + res[i].serv_nome + "</li>";
			}
			servicos.innerHTML=html;
		},
		error:function(jqXHR,errStr,errThrown){
			console.log(errStr);
		}
	})
    }
	
}