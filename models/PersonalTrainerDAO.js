var pool = require('./MysqlConfig').pool;

module.exports.getPts = function (callback, next) {
    pool.getConnection(function (err, conn) {
        if (err)
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })

        conn.query("SELECT pts_id,utiliz_nome,utiliz_imagem,serv_id,serv_nome,pts_lat,pts_long FROM personalTrainers,utilizadores,servicos,servicos_personalTrainers where pts_utiliz_id=utiliz_id and servpts_serv_id=serv_id and servpts_pts_id=pts_id", function (err, results) {
            conn.release();
            if (err) {
                callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                return;
            }
            callback(false, { code: 200, status: "ok", data: results })
        })
    })
}

module.exports.getPt = function (id, callback, next) {
    pool.getConnection(function (err, conn) {
        if (err)
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })

        conn.query("select utiliz_nome,utiliz_email,pts_localTreino,utiliz_dtnsc, pts_descricao, utiliz_imagem,utiliz_sexo, serv_id, serv_nome, servpts_preco from personalTrainers, utilizadores,servicos,servicos_personalTrainers where pts_utiliz_id=utiliz_id and servpts_serv_id=serv_id and servpts_pts_id=pts_id and pts_id=?", [id], function (err, pt) {
            if (err) {
                callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                return;
            }
            conn.query("select serv_nome,servpts_id, servpts_serv_id from servicos,servicos_personalTrainers,personalTrainers where servpts_serv_id=serv_id and servpts_pts_id=pts_id and pts_id= ?", [id], function (err, servicos) {
                conn.release();
                if (err) {
                    callback(err, { code: 500, status: "Error in a database query" })
                    return;
                }
                var result = pt[0];
                result.servicos = servicos;
                callback(false, { code: 200, status: "ok", data: result })
            })
        })
    })
}

module.exports.addServicos = function (servpts_pts_id, servpts_serv_id, callback, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })
        }
        conn.query("insert into servicos_personalTrainers (servpts_pts_id,servpts_serv_id) values (?,?)",
            [servpts_pts_id, servpts_serv_id], function (err, results) {
                conn.release();
                if (err) {
                    callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                    return;
                }
                callback(false, { code: 200, status: "ok", data: results })

            })
    })
}

module.exports.getPtSubs = function (id, callback, next) {
    pool.getConnection(function (err, conn) {
        if (err)
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })

        conn.query("select subs_cli_id,subs_estado_id,utiliz_imagem,utiliz_nome,cli_morada,utiliz_dtnsc,serv_nome from utilizadores,subscricoes,clientes,servicos_personalTrainers,personalTrainers,servicos where  subs_cli_id=cli_id and subs_servpts_id=servpts_id and cli_utiliz_id=utiliz_id and servpts_pts_id=pts_id and servpts_serv_id=serv_id and servpts_pts_id=?", [id], function (err, results) {
            conn.release();
            if (err) {
                callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                return;
            }
            callback(false, { code: 200, status: "ok", data: results })
        })
    })
}
