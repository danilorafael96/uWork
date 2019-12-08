var pool = require('./MysqlConfig').pool;


module.exports.getServNome=function(callback,next){
    pool.getConnection(function(err,conn){
        if(err)
            callback(err,{code:500, status:"Erro na conexão da base de dados"})
        
        conn.query("SELECT serv_nome FROM servicos",function(err,results){
            conn.release();
            if(err){
                callback(err,{code:500,status:"Erro na conexão da base de dados"})
                return;
            }
            callback(false,{code:200,status:"ok",data:results})
        })
    })
}

module.exports.Subscreve = function (obj, callback, next) {
    pool.getConnection(function (err, conn) {
        if (err)
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })
        conn.query("INSERT INTO clientes_servicos(cliser_serv_id,cliserv_est_id) VALUES (?,'3')",[obj.servico],function(err,rows){
            conn.release();
            callback(rows);
        })
    })
}