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

module.exports.getServicosPT=function(pts_id,serv_id,callback,next){
    pool.getConnection(function(err,conn){
        if(err)
            callback(err,{code:500, status:"Erro na conexão da base de dados"})
        
        conn.query("SELECT serv_id,servpts_pts_id,servpts_serv_id, serv_nome,utiliz_nome FROM servicos,servicos_personalTrainers,personalTrainers,utilizadores where servpts_pts_id=pts_id and servpts_serv_id=serv_id and pts_utiliz_id=utiliz_id and pts_id=? and serv_id=?",[pts_id,serv_id],function(err,results){
            conn.release();
            if(err){
                callback(err,{code:500,status:"Erro na conexão da base de dados"})
                return;
            }
            callback(false,{code:200,status:"ok",data:results})
        })
    })
}