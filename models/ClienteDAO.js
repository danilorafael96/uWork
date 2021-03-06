var pool = require('./MysqlConfig').pool;

module.exports.getClientes = function (callback, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })
        }
        conn.query("select cli_id, utiliz_id,cli_utiliz_id, utiliz_nome, utiliz_nomeUtilizador, utiliz_email, utiliz_dtnsc, utiliz_sexo, cli_morada,utiliz_imagem from clientes,utilizadores where cli_utiliz_id=utiliz_id", function (err, results) {
            conn.release();
            if (err) {
                callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                return;
            }
            callback(false, { code: 200, status: "ok", data: results })
        })
    })
}

module.exports.getCliente = function (id, callback, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })
        }
        conn.query("select utiliz_nome,utiliz_email,cli_morada,utiliz_dtnsc,utiliz_sexo,utiliz_imagem from clientes,utilizadores where cli_utiliz_id=utiliz_id and cli_id=?",
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

module.exports.addSubscricao = function (subs_cli_id, subs_servpts_id, callback, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })
        }
        conn.query("insert into subscricoes (subs_estado_id,subs_cli_id,subs_servpts_id) values (2,?,?)",
            [subs_cli_id, subs_servpts_id], function (err, results) {
                conn.release();
                if (err) {
                    callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                    return;
                }
                callback(false, { code: 200, status: "ok", data: results })

            })
    })
}

module.exports.cancelaSubscricao = function (subs_cli_id, subs_servpts_id, callback, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })
        }
        conn.query("update subscricoes set subs_dataHora_fim=CURRENT_TIMESTAMP, subs_estado_id=3 where subs_cli_id=? and subs_servpts_id=?",
            [subs_cli_id, subs_servpts_id], function (err, results) {
                conn.release();
                if (err) {
                    callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                    return;
                }
                callback(false, { code: 200, status: "ok", data: results })

            })
    })
}

module.exports.getClienteSubscricoes = function (id, callback, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })
        }
        conn.query("select pts_id,subs_id,estado_id,subs_servpts_id,utiliz_nome,serv_nome,pts_localTreino,utiliz_dtnsc, estado_nome,subs_dataHora_inicio,subs_dataHora_fim,utiliz_imagem from utilizadores,personalTrainers,subscricoes,servicos_personalTrainers,servicos,clientes,estadoSubscricao where pts_utiliz_id=utiliz_id and subs_servpts_id=servpts_id and servpts_pts_id=pts_id and servpts_serv_id=serv_id and subs_cli_id=cli_id and subs_estado_id=estado_id and subs_cli_id=?",
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

module.exports.getSubscricoesCanceladas = function (id, callback, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })
        }
        conn.query("select pts_id,subs_id,subs_servpts_id,utiliz_nome,pts_localTreino,utiliz_dtnsc,serv_nome,estado_nome,utiliz_imagem from utilizadores,personalTrainers,subscricoes,servicos_personalTrainers,servicos,clientes,estadoSubscricao where pts_utiliz_id=utiliz_id and subs_servpts_id=servpts_id and servpts_pts_id=pts_id and servpts_serv_id=serv_id and subs_cli_id=cli_id and subs_estado_id=estado_id and subs_estado_id=3 and subs_cli_id=?",
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
