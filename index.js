const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000;
const mysql = require('mysql');
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', (req, res) => res.json({ 'message': 'API no ar' }));

router.get('/clientes', (req, res) => {
    execSQL('SELECT * FROM clients', res);
})
router.get('/clientes/:id?', (req, res) => {
    let filter = null;
    if (req.params.id)
        filter = ' WHERE ID =' + parseInt(req.params.id);
    
    execSQL('SELECT * FROM clients' + filter, res)
})
router.delete('/clientes/excluir/:id', (req, res) => {
    execSQL('DELETE FROM clients WHERE id =' + parseInt(req.params.id), res);
})
router.post('/clientes/novo', (req, res) => {
    const name = req.body.name;
    const cpf = req.body.cpf;
    const city = req.body.city;
    const uf = req.body.uf;

    execSQL(`INSERT INTO clients (name, cpf, city, uf) VALUES ('${name}', '${cpf}', '${city}', '${uf}')`, res);
})
router.put('/clientes/atualizar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const name = req.body.name;
    const cpf = req.body.cpf;
    const city = req.body.city;
    const uf = req.body.uf;

    execSQL(`UPDATE clients SET name = '${name}', cpf = '${cpf}', city = '${city}', uf = '${uf}' WHERE id = ${id}`, res);
})

app.use('/', router);
app.listen(3000);

function execSQL(sqlQry, res)
{
    const connection = mysql.createConnection({
        host: 'localhost',
        port: '/var/run/mysqld/mysqld.sock',
        user: 'dev',
        password: 'senha',
        database: 'api_node',
    })

    connection.query(sqlQry, function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
      connection.end();
      console.log('Executou!');
  });
}