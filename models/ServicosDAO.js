var pool = require('./MysqlConfig').pool;


module.exports.getServicos=function(callback,next){
    pool.getConnection(function(err,conn){
        if(err)
            callback(err,{code:500, status:"Erro na conexão da base de dados"})
        
        conn.query("SELECT serv_id, serv_nome FROM servicos",function(err,results){
            conn.release();
            if(err){
                callback(err,{code:500,status:"Erro na conexão da base de dados"})
                return;
            }
            callback(false,{code:200,status:"ok",data:results})
        })
    })
}

module.exports.getFiltroPts = function (servId,callback, next) {
    pool.getConnection(function (err, conn) {
        if (err)
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })

        conn.query("SELECT pts_id,utiliz_nome,utiliz_imagem,pts_lat,pts_long,serv_nome FROM personalTrainers,utilizadores,servicos,servicos_personalTrainers where pts_utiliz_id=utiliz_id and servpts_pts_id=pts_id and servpts_serv_id=serv_id and serv_id=?",[servId],function (err, results) {
            conn.release();
            if (err) {
                callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                return;
            }
            callback(false, { code: 200, status: "ok", data: results })
        })
    })
}