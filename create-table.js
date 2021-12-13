const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  port     : '/var/run/mysqld/mysqld.sock',
  user     : 'dev',
  password : 'senha',
  database : 'api_node'
});

connection.connect(function(err){
    if(err) return console.log(err);
        console.log('Conectado ao Banco de Dados!');
    createTable(connection);
    addRows(connection);
})

function createTable(conn){
    const sql = `CREATE TABLE api_node.clients (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NULL,
    cpf VARCHAR(11) NULL,
    city VARCHAR(255) NULL,
    uf VARCHAR(2) NULL,
    PRIMARY KEY (id))`;
    
    conn.query(sql, function (error, results, fields){
        if(error) return console.log(error);
            console.log('Tabela criada!');
    });
}

function addRows(conn){
    const sql = "INSERT INTO clients(name, cpf, city, uf) VALUES ?";
    const values = [
        ['Heloísa', '99999999999', 'Curitiba', 'PR'],
        ['Victor', '99999999999', 'Curitiba', 'PR'],
      ];
    conn.query(sql, [values], function (error, results, fields){
        if(error) return console.log(error);
            console.log('Registros adicionados!');
        conn.end();
    });
}