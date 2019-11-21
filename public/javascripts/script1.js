var loc = [38.7071382,-9.15238686328902];
console.log("Start");
window.onload = function () {
	console.log("Loaded");
    var mymap = L.map('mapid').setView(loc, 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1IjoiZHJhZmFlbCIsImEiOiJjazJxMnBlb3IwNzg3M25tb21ncjZzNmRrIn0.5qpXqrTCKD6ouYStFOHygA'
}).addTo(mymap);
var marker = L.marker(loc).addTo(mymap);
}


window.onload=function(){
	var servicos=document.getElementById("nomeServicos");
	loadListaServicos(servicos);

	function loadListaServicos(elem){
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
					html+="<ul class='dropdown-content' id='nomeServicos' onmouseover='listaServicos("+res[i].id+")'>"+res[i].name+"</ul>"
				}
				elem.innerHTML=html;
			},
			error:function(jqXHR,errStr,errThrown){
				console.log(errStr);
			}
		})
	}
}