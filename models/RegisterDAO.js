var pool = require('./MysqlConfig').pool;

module.exports.saveRegister = function (obj, callback, next) {
    console.log("HERE")
        
    pool.getConnection(function (err, conn) {
        console.log("HERE")
        
        if (err) {
            conn.release();
            console.log(err);
        }
        else
            try {
                console.log("HERE")
                conn.query('INSERT INTO utilizadores(utiliz_nomeUtilizador, utiliz_email, utiliz_password, utiliz_nome, utiliz_sexo,utiliz_dtnsc) VALUES (?,?,?,?,?,?)', 
                [obj.username, obj.email, obj.password, obj.nome, obj.sexo, obj.dataNascimento], function (err, result) {
                    console.log(err)
                    conn.query('INSERT INTO personalTrainers(pts_localTreino,pts_lat,pts_long,pts_utiliz_id) VALUES (?,?,?,?)', [obj.localTreino,obj.lat,obj.lng,result.insertId], function (err, rows) {
                        console.log(err)    
                        conn.release();
                        callback(rows);
                    })
                })

            } catch (err) {
                console.log(err)
            }
    })
}



module.exports.getLatLong = function(callback, next) {
    pool.getConnection(function(err,conn) {
        if (err) {
            callback(err,{code: 500, status: "Erro na conexão da base de dados"})
        }
        conn.query("SELECT pts_lat, pts_long FROM personalTrainers", function(err, results) {
            // Sempre fazer o release de uma conexão depois de não precisar mais dela
            // Podemos fazer mais de uma query e no final fazer o release dela
            conn.release();
            console.log(results);
            if (err) {
                callback(err,{code: 500, status: "Erro na conexão da base de dados"})
                return;
            }
            callback(false, {code: 200, status:"ok", data: results})
        })

    })
}



