var pool = require('./MysqlConfig').pool;

module.exports.getPts = function (callback, next) {
    pool.getConnection(function (err, conn) {
        if (err)
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })

        conn.query("SELECT utiliz_id,utiliz_password,pts_id,utiliz_nome,utiliz_imagem,pts_lat,pts_long FROM personalTrainers,utilizadores where pts_utiliz_id=utiliz_id", function (err, results) {
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

        conn.query("select utiliz_nome,utiliz_email,pts_localTreino,utiliz_dtnsc, pts_descricao, utiliz_imagem,utiliz_sexo from personalTrainers, utilizadores where pts_utiliz_id=utiliz_id and pts_id=?", [id], function (err, results) {
            if (err) {
                callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                return;
            }
            callback(false, { code: 200, status: "ok", data: results })
        })
    })
}

module.exports.getPtServicos = function (id, callback, next) {
    pool.getConnection(function (err, conn) {
        if (err)
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })

        conn.query("select pts_id,serv_nome,serv_preco,pts_lat,pts_long,pts_geom from personalTrainers left join servicos_personalTrainers on servpts_pts_id=pts_id  left join servicos on serv_id = servpts_serv_id where pts_id=?", [id], function (err, results) {
            if (err) {
                callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                return;
            }
            callback(false, { code: 200, status: "ok", data: results })
        })
    })
}

module.exports.addServico = function (servpts_pts_id, servpts_serv_id,servpts_preco, callback, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })
        }
        conn.query("insert into servicos_personalTrainers (servpts_pts_id,servpts_serv_id,servpts_preco) values (?,?,?)",
            [servpts_pts_id, servpts_serv_id,servpts_preco], function (err, results) {
                conn.release();
                console.log(err)
                if (err) {
                    callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                    return;
                }
                console.log();
                callback(false, { code: 200, status: "ok", data: results })

            })
    })
}

module.exports.removeServico = function (servpts_id, callback, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })
        }
        conn.query("delete from servicos_personalTrainers where servpts_id=?",
            [servpts_id], function (err, results) {
                conn.release();
                console.log(err)
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

        conn.query("select subs_cli_id,subs_estado_id,utiliz_nome,serv_nome,estado_nome,cli_morada,utiliz_imagem,cli_lat,cli_long,utiliz_dtnsc from utilizadores,subscricoes,clientes,servicos_personalTrainers,personalTrainers,servicos,estadoSubscricao where  subs_estado_id=estado_id and subs_cli_id=cli_id and subs_servpts_id=servpts_id and cli_utiliz_id=utiliz_id and servpts_pts_id=pts_id and servpts_serv_id=serv_id and servpts_pts_id=?", [id], function (err, results) {
            conn.release();
            if (err) {
                callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                return;
            }
            callback(false, { code: 200, status: "ok", data: results })
        })
    })
}

module.exports.getSubsAtiva = function (servpts_pts_id,subs_cli_id,servpts_pts_id,subs_cli_id, callback, next) {
    pool.getConnection(function (err, conn) {
        if (err)
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })

        conn.query("select servpts_id,servpts_serv_id,subscrito,servpts_pts_id,utiliz_nome,serv_nome,serv_preco,pts_descricao,utiliz_imagem from (select servpts_id,servpts_serv_id,servpts_pts_id, true as subscrito from servicos_personalTrainers where servpts_pts_id=? and servpts_id in (select subs_servpts_id from subscricoes where subs_estado_id=2 and subs_cli_id=? ) UNION select servpts_id,servpts_serv_id,servpts_pts_id, false as subscrito from servicos_personalTrainers where servpts_pts_id=? and servpts_id not in (select subs_servpts_id from subscricoes where subs_estado_id=2 and subs_cli_id=?)) as servicos_deste_pt left join personalTrainers on pts_id=servpts_pts_id left join utilizadores on utiliz_id=pts_utiliz_id left join servicos on servpts_serv_id=serv_id", [servpts_pts_id,subs_cli_id,servpts_pts_id,subs_cli_id], function (err, results) {
            console.log(err);
            conn.release();
            if (err) {
                callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                return;
            }
            callback(false, { code: 200, status: "ok", data: results })
        })
    })
}


module.exports.getPtServicosContrarios=function(pts_id,callback,next){
    pool.getConnection(function(err,conn){
        if(err)
            callback(err,{code:500, status:"Erro na conexão da base de dados"})
        
        conn.query("select DISTINCT serv_nome,serv_preco,serv_id from personalTrainers,servicos_personalTrainers,servicos where servpts_pts_id=pts_id and servpts_serv_id=serv_id and serv_nome not in (select DISTINCT serv_nome from personalTrainers,servicos_personalTrainers,servicos where servpts_pts_id=pts_id and servpts_serv_id=serv_id and pts_id=?)",[pts_id],function(err,results){
            conn.release();
            if(err){
                callback(err,{code:500,status:"Erro na conexão da base de dados"})
                return;
            }
           callback(false,{code:200,status:"ok",data:results})
        })
    })
}