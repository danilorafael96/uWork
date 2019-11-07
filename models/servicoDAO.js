var pool = require('./connection').pool;


module.exports.getServNome = function(callback, next) {
    pool.getConnection(function(err,conn) {
        if (err) {
            callback(err,{code: 500, status: "Erro na conexão da base de dados"})
        }
        conn.query("select serv_id, serv_nome, serv_preco from servicos", function(err, results) {
            // Sempre fazer o release de uma conexão depois de não precisar mais dela
            // Podemos fazer mais de uma query e no final fazer o release dela
            conn.release();
            if (err) {
                callback(err,{code: 500, status: "Erro na conexão da base de dados"})
                return;
            }
            callback(false, {code: 200, status:"ok", data: results})
        })

    })
}


module.exports.getServicos = function (id, callback, next) {
    pool.getConnection(function(err,conn){
        if (err) {
            callback(err,{code: 500, status: "Erro na conexão da base de dados"})
        }

        // ? is the place where we will replace for the parameter
        // This is a prepared statement, so that we avoid SQL injection
        conn.query("select serv_nome from servicos where id = ?", [id], function(err, results) {
           conn.release();
            if (err) {
                callback(err,{code: 500, status: "Erro na conexão da base de dados"})
                return;
            } 
            // sending only the first since there is only one (id is primary key)
            callback(false, {code: 200, status:"ok", data: results[0]})
        })
    })
}