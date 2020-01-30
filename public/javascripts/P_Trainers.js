
window.onload = function () {

	listaServicos();
	listaPts();
}

//Função que apresenta os serviços da plataforma que vai permitir filtrar a lista de personal trainers.
function listaServicos() {
	var servicos = document.getElementById('servicos');
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
				html += "<input type='button' name='servico' value='" + res[i].serv_nome + "' onclick='filtroPts(" + res[i].serv_id + ")'>"
			}
			servicos.innerHTML = html;
		},
		error: function (jqXHR, errStr, errThrown) {
			console.log(errStr);
		}
	})
}

//Apresenta a lista geral de personal trainers.
function listaPts() {
	var pts = document.getElementById("pts");
	$.ajax({
		url: "/api/pts",
		method: "get",
		contentType: "application/json",
		dataType: "json",
		success: function (res, status, jqXHR) {
			console.log(status);
			console.log(res);
			if (res.err) {
				console.log(JSON.stringify(res));
				return;
			}

			var html = "";
			for (i in res) {
				html += "<li onclick='carregaPt(" + res[i].pts_id + ")'><img src=" + res[i].utiliz_imagem + " alt='personalTrainer'><p>" + res[i].utiliz_nome + "</p></li>"
			}

			pts.innerHTML = html;
		},
		error: function (jqXHR, errStr, errThrown) {
			console.log(errStr);
		}
	})
}

/*Filtra lista de personal trainers por id de serviço. Quando selecionado o serviço para 
a filtragem da lista de personal trainers, é passado um atributo com o id do serviço
*/
function filtroPts(servId) {
	var pts = document.getElementById("pts");
	$.ajax({
		url: "/api/servicos/" + servId + "/pts",
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
				if (servId == 1) {
					html1 += "<li onclick='carregaPt(" + res[i].pts_id + ")'><img src=" + res[i].utiliz_imagem + " alt='personalTrainer'><p>" + res[i].utiliz_nome + "</p></li>"
				} else if (servId == 2) {
					html1 += "<li onclick='carregaPt(" + res[i].pts_id + ")'><img src=" + res[i].utiliz_imagem + " alt='personalTrainer'><p>" + res[i].utiliz_nome + "</p></li>"
				} else if (servId == 3) {
					html1 += "<li onclick='carregaPt(" + res[i].pts_id + ")'><img src=" + res[i].utiliz_imagem + " alt='personalTrainer'><p>" + res[i].utiliz_nome + "</p></li>"
				} else if (servId == 4) {
					html1 += "<li onclick='carregaPt(" + res[i].pts_id + ")'><img src=" + res[i].utiliz_imagem + " alt='personalTrainer'><p>" + res[i].utiliz_nome + "</p></li>"
				}
			}

			pts.innerHTML = html1;
		},
		error: function (jqXHR, errStr, errThrown) {
			console.log(errStr);
		}
	})
}

//Após escolhido o personal trainer, esta função guarda o id do mesmo e altera para a sua página pessoal.
function carregaPt(pts_id) {
	sessionStorage.setItem("ptId", pts_id);
	window.location.href = "P_Trainer.html";
}