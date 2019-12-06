var pool = require('./MysqlConfig').pool;


module.exports.getPts=function(callback,next){
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
}