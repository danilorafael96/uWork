
window.onload = function () {
	var servicos = document.getElementById('servicos');
	var pts = document.getElementById("pts");
	//var pt=document.getElementById("pt");
	loadPts();
	//loadPt();

	$.ajax({
		url: "/api/servicos",
		method: "get",
		contentType: "aplication/json",
		dataType: "json",
		success: function (res, status, jqXHR) {
			console.log(status);
			if (res.err) {
				console.log(JSON.stringify(res));
				return;
			}
			var html = "";
			for (i in res) {
				html += "<option value=" + i + ">" + res[i].serv_nome + "</option>"
			}
			servicos.innerHTML = html;
		},
		error: function (jqXHR, errStr, errThrown) {
			console.log(errStr);
		}
	})
}
	function loadPts() {

		$.ajax({
			url: "/api/pts",
			method: "get",
			contentType: "aplication/json",
			dataType: "json",
			success: function (res, status, jqXHR) {
				console.log(status);
				if (res.err) {
					console.log(JSON.stringify(res));
					return;
				}
				var html = "";
				for (i in res) {
					html += "<li id='pt' onclick='loadPt("+i+")'><a href='P_Trainer.html'><img src='"+res[i].pts_imagem+"'>" + res[i].serv_nome+" "+res[i].pts_nome + "</a></li>";
				}

				pts.innerHTML = html;
			},
			error: function (jqXHR, errStr, errThrown) {
				console.log(errStr);
			}
		})
/*
	function loadPt(ptPos){
		var pts=document.getElementById("pt");
		var html="";
		var pt=res[ptPos].personalTrainers;

		for(i in pt){
			html+=""
		}

				
	}*/
}