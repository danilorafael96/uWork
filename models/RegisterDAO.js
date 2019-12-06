var pool = require('./MysqlConfig').pool;

module.exports.saveRegister = function (obj, callback, next) {
    mysql.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query('INSERT INTO personalTrainer(pts_nome, pts_sexo,pts_localTreino,) VALUES (?,?,?)', [obj.pts_nome, obj.pts_sexo, obj.pts_localTreino], function (err, rows) {
             conn.query('INSERT INTO utilizadores(utiliz_nomeUtilizador, utiliz_email, utiliz_password) VALUES (?,?,?)', [obj.utiliz_nomeUtilizador, obj.utiliz_email, obj.utiliz_passwor], function (err, rows) {
                conn.release(); 
            }),
            conn.release();
            callback(rows);
        })
    })
}

module.exports.saveRegister = function(data,callback) {
    console.log(data);
}