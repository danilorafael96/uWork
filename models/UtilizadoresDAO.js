var pool = require('./MysqlConfig').pool;

module.exports.getUtilizadores=function(callback){
    pool.getConnection(function(err,conn){
        if(err)
            callback(err,{code:500,status:"Erro na conexão da base de dados."})
        conn.query("SELECT utiliz_nome FROM utilizadores",function(err,results){
            conn.release();
            if(err){
                callback(err,{code:500,status:"Erro na conexão da base de dados."})
                return;
            }
            callback(false,{code:200,status:"ok",data:results})
        })
    })
}