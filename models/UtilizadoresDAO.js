var pool = require('./MysqlConfig').pool;

module.exports.getUtilizadores=function(callback){
    pool.getConnection(function(err,conn){
        if(err)
            callback(err,{code:500,status:"Erro na conexão da base de dados."})
        conn.query("SELECT utiliz_nome, utiliz_password FROM utilizadores",function(err,results){
            conn.release();
            if(err){
                callback(err,{code:500,status:"Erro na conexão da base de dados."})
                return;
            }
            callback(false,{code:200,status:"ok",data:results})
        })
    })
}

module.exports.getClientes=function(callback){
    pool.getConnection(function(err,conn){
        if(err)
            callback(err,{code:500,status:"Erro na conexão da base de dados."})
        conn.query("SELECT cli_id,utiliz_nome, utiliz_password FROM utilizadores, clientes where cli_utiliz_id = utiliz_id",function(err,results){
            conn.release();
            if(err){
                callback(err,{code:500,status:"Erro na conexão da base de dados."})
                return;
            }
            callback(false,{code:200,status:"ok",data:results})
        })
    })
}

module.exports.getPts=function(pts_id,callback){
    pool.getConnection(function(err,conn){
        if(err)
            callback(err,{code:500,status:"Erro na conexão da base de dados."})
        conn.query("SELECT pts_lat,pts_long, utiliz_nome, utiliz_password FROM utilizadores, personalTrainers where pts_utiliz_id = utiliz_id and pts_id=?",[pts_id],function(err,results){
            conn.release();
            if(err){
                callback(err,{code:500,status:"Erro na conexão da base de dados."})
                return;
            }
            callback(false,{code:200,status:"ok",data:results})
        })
    })
}

module.exports.addRegistroPT = function (obj, callback, next) {
    pool.getConnection(function (err, conn) {
        if (err) 
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })

        conn.query('INSERT INTO utilizadores(utiliz_nomeUtilizador, utiliz_email, utiliz_password, utiliz_nome, utiliz_sexo,utiliz_imagem,utiliz_dtnsc) VALUES (?,?,?,?,?,?,?)',
            [obj.username, obj.email, obj.password, obj.nome, obj.sexo,obj.imagem, obj.dataNascimento], function (err, result) {
                if (err) {
                    callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                    return;
                }
                conn.query('INSERT INTO personalTrainers(pts_descricao,pts_localTreino,pts_lat,pts_long,pts_geom,pts_utiliz_id) VALUES (?,?,?,?,Point(?,?),?)', [obj.descricao, obj.localTreino, obj.lat, obj.lng,obj.lng, obj.lat, result.insertId], function (err, rows) {
                    conn.release();
                    if (err) {
                        callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                        return;
                    }
                    callback(rows);
                })
        })
    })
}

module.exports.addRegistroCliente = function (obj, callback, next) {
    pool.getConnection(function (err, conn) {
        if (err) 
            callback(err, { code: 500, status: "Erro na conexão da base de dados" })

        conn.query('INSERT INTO utilizadores(utiliz_nomeUtilizador, utiliz_email, utiliz_password, utiliz_nome, utiliz_sexo,utiliz_imagem,utiliz_dtnsc) VALUES (?,?,?,?,?,?,?)',
            [obj.username, obj.email, obj.password, obj.nome, obj.sexo,obj.imagem, obj.dataNascimento], function (err, result) {
                if (err) {
                    callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                    return;
                }
                conn.query('INSERT INTO clientes(cli_morada,cli_lat,cli_long,cli_utiliz_id) VALUES (?,?,?,?)', [obj.morada, obj.lat, obj.lng, result.insertId], function (err, rows) {
                    conn.release();
                    if (err) {
                        callback(err, { code: 500, status: "Erro na conexão da base de dados" })
                        return;
                    }
                    callback(rows);
                })
        })
    })
}