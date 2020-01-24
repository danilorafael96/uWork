

window.onload = function () {
	var servicos = document.getElementById('servicos');
	var pts = document.getElementById("pts");
	loadPts();

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
				html += "<input type='button' name='servico' value='" + res[i].serv_nome +"' onclick='filtroPts(" + res[i].serv_id + ")'>"
			}
			servicos.innerHTML = html;
		},
		error: function (jqXHR, errStr, errThrown) {
			console.log(errStr);
		}
	})

	function loadPts() {

		$.ajax({
			url: "/api/pts",
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
					html += "<li onclick='openPt(" + res[i].pts_id + ")'><img src=" + res[i].utiliz_imagem + " alt='personalTrainer'><p>" + res[i].utiliz_nome + "</p></li>"
				}

				pts.innerHTML = html;
			},
			error: function (jqXHR, errStr, errThrown) {
				console.log(errStr);
			}
		})
	}
}

function filtroPts(servId) {
	var pts = document.getElementById("pts");
	$.ajax({
		url: "/api/servicos/"+servId+"/pts",
		method: "get",
		contentType: "application/json",
		dataType: "json",
		success: function (res, status, jqXHR) {
			console.log(status);
			if (res.err) {
				console.log(JSON.stringify(res));
				return;
			}

			var html1 = "";
			for (i in res) {
				if(servId==1){
					html1 += "<li onclick='openPt(" + res[i].pts_id + ")'><img src=" + res[i].utiliz_imagem + " alt='personalTrainer'><p>" + res[i].utiliz_nome + "</p></li>"
				}else if(servId==2){
					html1 += "<li onclick='openPt(" + res[i].pts_id + ")'><img src=" + res[i].utiliz_imagem + " alt='personalTrainer'><p>" + res[i].utiliz_nome + "</p></li>"
				}else if(servId==3){
					html1 += "<li onclick='openPt(" + res[i].pts_id + ")'><img src=" + res[i].utiliz_imagem + " alt='personalTrainer'><p>" + res[i].utiliz_nome + "</p></li>"
				}else if(servId==4){
					html1 += "<li onclick='openPt(" + res[i].pts_id + ")'><img src=" + res[i].utiliz_imagem + " alt='personalTrainer'><p>" + res[i].utiliz_nome + "</p></li>"
				}
			}

			pts.innerHTML = html1;
		},
		error: function (jqXHR, errStr, errThrown) {
			console.log(errStr);
		}
	})
}

function openPt(pts_id) {
	sessionStorage.setItem("ptId", pts_id);
	window.location.href = "P_Trainer.html";
}