var pool = require('./MysqlConfig').pool;

module.exports.getClientes = function (callback, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })
        }
        conn.query("select cli_id, utiliz_id,cli_utiliz_id, utiliz_nome, utiliz_nomeUtilizador, utiliz_email, utiliz_dtnsc, utiliz_sexo, cli_morada,utiliz_imagem cliserv_serv_id, serv_nome from clientes,utilizadores,servicos,clientes_servicos where cli_utiliz_id=utiliz_id and cliserv_serv_id=serv_id and cliserv_cli_id", function (err, results) {
            conn.release();
            if (err) {
                callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                return;
            }
            callback(false, { code: 200, status: "ok", data: results })
        })
    })
}

module.exports.getClienteId = function (id, callback, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })
        }
        conn.query("select cli_id,utiliz_nome,est_nome,serv_nome,cliserv_pts_id from clientes,clientes_servicos,estados,personalTrainers,utilizadores,servicos where cli_utiliz_id=utiliz_id and cliserv_est_id=est_id and cliserv_pts_id=pts_id and cliserv_serv_id=serv_id and cliserv_cli_id=cli_id and cli_id=?",
            [id], function (err, results) {
                conn.release();
                if (err) {
                    callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                    return;
                }
                callback(false, { code: 200, status: "ok", data: results })
            })
    })
}

module.exports.addSubscricao = function (serv_id, pts_id, callback, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })
        }
        //for (var i = 0; i < serv_id.lenght; i++) {
            conn.query("insert into clientes_servicos (cliserv_serv_id,cliserv_pts_id) values (?,?)",
                [serv_id, pts_id], function (err, results) {
                    conn.release();
                    if (err) {
                        callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                        return;
                    }
                    callback(false, { code: 200, status: "ok", data: results })

                })
        //}

    })
}
/*


module.exports.getSubscricoes = function (callback, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })
        }
        conn.query("select cli_id,utiliz_nome,est_nome,serv_nome,cliserv_pts_id from clientes,clientes_servicos,estados,personalTrainers,utilizadores,servicos where cli_utiliz_id=utiliz_id and cliserv_est_id=est_id and cliserv_pts_id=pts_id and cliserv_serv_id=serv_id and cliserv_cli_id=cli_id", function (err, results) {
            conn.release();
            if (err) {
                callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                return;
            }
            callback(false, { code: 200, status: "ok", data: results })
        })
    })
}*/

/*
module.exports.getSubscricaoId = function (id,callback, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })
        }
        conn.query("select cli_id,utiliz_nome,est_nome,serv_nome,cliserv_pts_id from clientes,clientes_servicos,estados,personalTrainers,utilizadores,servicos where cli_utiliz_id=utiliz_id and cliserv_est_id=est_id and cliserv_pts_id=pts_id and cliserv_serv_id=serv_id",[id], function (err, results) {
            conn.release();
            if (err) {
                callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                return;
            }
            callback(false, { code: 200, status: "ok", data: results })
        })
    })
}*/
