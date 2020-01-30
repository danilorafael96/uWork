
//
function addr_search() {
    var inp = document.getElementById("local");
    var options = document.getElementById("localList");

    $.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + inp.value, function (data) {
        var items = [];
        var res = "";
        $.each(data, function (key, val) {
            res += "<option>" + val.display_name + "</option>";
        });
        options.innerHTML = res;

        $('#results').empty();
        if (items.length != 0) {
            $('<p>', { html: "Search results:" }).appendTo('#results');
            $('<ul/>', {
                'class': 'my-new-list',
                html: items.join('')
            }).appendTo('#results');
        } else {
            $('<p>', { html: "No results found" }).appendTo('#results');
        }
    });
}

var loc;


//
function registrar() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var nome = document.getElementById("nome").value;
    var sexo = document.getElementById("sexo").value;
    var imagem = document.getElementById("imagem").value;
    var dataNascimento = document.getElementById("data").value;
    var descricao = document.getElementById("descrição").value;
    var localTreino = document.getElementById("local").value;

    $.getJSON('http://nominatim.openstreetmap.org/search/' + localTreino + '?format=json', function (data) {


        var lat = data[0].lat
        var long = data[0].lon
        console.log(lat + ',' + long)

        loc = {
            localTreino: localTreino,
            lat: lat,
            lng: long
        }

        $.ajax({
            url: "/api/utilizadores/personalTrainers",
            method: "post",
            contentType: "application/json",
            data: JSON.stringify({
                username: username,
                email: email,
                password: password,
                nome: nome,
                sexo: sexo,
                imagem: imagem,
                dataNascimento: dataNascimento,
                descricao: descricao,
                localTreino: localTreino,
                lat: loc.lat,
                lng: loc.lng,
                ponto:[
                    loc.lng,
                    loc.lat
                ]
            }),
            success: function (data, status) {
                window.location = "LoginPT.html"
                document.getElementById("msg").innerHTML = "Registro efectuado com sucesso"
                JSON.stringify(data);

            }
        })
    })
}