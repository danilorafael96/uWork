

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
				html += "<option value=" + i + " onchange='filter()'>" + res[i].serv_nome + "</option>"
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
					html += "<li onclick='openPt(" + res[i].pts_id + ")'><img src=" + res[i].utiliz_imagem + " alt='personalTrainer'></li>";
				}

				pts.innerHTML = html;
			},
			error: function (jqXHR, errStr, errThrown) {
				console.log(errStr);
			}
		})
	}
/*
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
				var servicosPt = [];
				for (var i=0;i<res.lenght;i++) {
					if (res[i].pts_id == res[i + 1].pts_id) {
						servicosPt[i].push(serv_nome);
					}
				}
				console.log(servicosPt);
				var html = "";
				for (i in res) {
					html += "<li onclick='openPt(" + res[i].pts_id + ")'><img src=" + res[i].utiliz_imagem + " alt='personalTrainer'>" + servicosPt[i] + "</li>";
				}

				pts.innerHTML = html;
			},
			error: function (jqXHR, errStr, errThrown) {
				console.log(errStr);
			}
		})
	}*/
}

/*
function filter(){

}*/

function openPt(pts_id) {
	sessionStorage.setItem("ptId", pts_id);
	window.location.href = "P_trainer.html";
}