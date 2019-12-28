var pool = require('./MysqlConfig').pool;

module.exports.getClientes = function (callback, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })
        }
        conn.query("select cli_id, utiliz_id,cli_utiliz_id, utiliz_nome, utiliz_nomeUtilizador, utiliz_email, utiliz_dtnsc, utiliz_sexo, cli_morada,utiliz_imagem, subs_servpts_id from clientes,utilizadores,subscricoes,servicos_personalTrainers,estadoSubscricao where cli_utiliz_id=utiliz_id and subs_servpts_id=servpts_id and subs_cli_id=cli_id and subs_estado_id=estado_id", function (err, results) {
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
        conn.query("select cli_id,cli_morada,utiliz_nome,utiliz_email,utiliz_dtnsc,estado_id,estado_nome,servpts_pts_id, subs_servpts_id from clientes,subscricoes,estadoSubscricao,utilizadores,servicos_personalTrainers,personalTrainers where cli_utiliz_id=utiliz_id and subs_estado_id=estado_id and subs_servpts_id=servpts_id and subs_cli_id=cli_id and servpts_pts_id=pts_id and cli_id=?",
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
            //insert está a ser feito com os valores do id do servico dentro do estado_id e o id do pt dentro do servpts_id!!
            conn.query("insert into subscricoes (subs_estado_id,subs_servpts_id) values (?,?)",
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
