var pool = require('./MysqlConfig').pool;

module.exports.getPts = function (callback, next) {
    pool.getConnection(function (err, conn) {
        if (err)
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })

        conn.query("SELECT * FROM personalTrainers,utilizadores,servicos,servicos_personalTrainers WHERE pts_utiliz_id=utiliz_id and servpts_pts_id=pts_id and servpts_serv_id=serv_id", function (err, results) {
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
        conn.query("select pts_id, pts_descricao, utiliz_imagem, serv_nome, servpts_preco from personalTrainers, utilizadores,servicos,servicos_personalTrainers where pts_utiliz_id=utiliz_id and servpts_serv_id=serv_id and servpts_pts_id=pts_id and pts_id=?", [id], function (err, results) {
            if (err) {
                callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                return;
            }
            callback(false, { code: 200, status: "ok", data: results })
        })
    })
}




/*
testes
*/

/*module.exports.getPts=function(callback,next){
    pool.getConnection(function(err,conn){
        if(err)
            callback(err,{code:500,status:"Erro na conexão da base de dados"})

        conn.query("SELECT pts_utiliz_id,pts_imagem, pts_nome, serv_nome FROM utilizadores,servicos,personalTrainers,servicos_personalTrainers WHERE utiliz_id= pts_utiliz_id and serv_id=servpts_serv_id and pts_id=servpts_pts_id",function(err,results){
            conn.release();
            if(err){
                callback(err,{code:500,status:"Erro na conexão da base de dados"})
                return;
            }
            callback(false,{code:200,status:"ok",data:results})
        })
    })
}*/

/*
module.exports.getPts = function (callback, next) {
    pool.getConnection(function (err, conn) {
        if (err)
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })

        conn.query("SELECT pts_id,pts_imagem, pts_nome, serv_nome FROM utilizadores,servicos,personalTrainers,servicos_personalTrainers WHERE utiliz_id= pts_utiliz_id and serv_id=servpts_serv_id and pts_id=servpts_pts_id", function (err, results) {
            conn.release();
            if (err) {
                callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                return;
            }

            var personalTrs = [];
            for (i in personalTrainers) {
                if (personalTrainers[i].pts_id !== personalTrainers[i - 1].pts_id) {
                    personalTrs.push({
                        id: personalTrainers[i].pts_id,
                        nome: personalTrainers[i].pts_nome
                    })
                }
                callback(false, { code: 200, status: "ok", data: personalTrs })
            }
        })
    })
}*/