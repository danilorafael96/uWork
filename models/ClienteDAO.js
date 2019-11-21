var pool = require('./MysqlConfig').pool;


module.exports.getClienteId = function(callback, next) {
    pool.getConnection(function(err,conn) {
        if (err) {
            callback(err,{code: 500, status: "Erro na conexão da base de dados"})
        }
        conn.query("SELECT * FROM clientes", function(err, results) {
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