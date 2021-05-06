const express = require('express')
//const faker = require('faker')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = process.env.PORT || 5000
const mysql = require('mysql')

app.set('view engine', 'ejs')     // Setamos que nossa engine será o ejs
app.use(expressLayouts)           // Definimos que vamos utilizar o express-ejs-layouts na nossa aplicação
app.use(bodyParser.urlencoded({ extended: true }))  // Com essa configuração, vamos conseguir parsear o corpo das requisições

// associar o json ao objeto req.body
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'))
app.listen(port, () => {
    console.log(`Porta ativa em http://localhost:${port}`)
})

app.get('/', (req, res) => {
    res.render('pages/home')
})
app.get('/cadastrarUsuarios', (req, res) => {   
    res.render('pages/cadastrarUsuarios')
})
app.get('/criarTechShots', (req, res) => {
    res.render('pages/criarTechShots')
})
app.get('/votar', (req, res) => {
    res.render('pages/votar')
})
app.get('/listarVotos', (req, res) => {
    res.render('pages/listarVotos')
})

//inicia o servidor
function execSQLQuery(sqlQry, res) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'techshots'
    });



    connection.query(sqlQry, function (error, results, fields) {
        if (error)
            res.json(error);
        else
            res.json(results);
        connection.end();
        console.log('executou!');
    });
};

app.get('/usuarios', (req, res) => {
    execSQLQuery('SELECT * FROM Usuarios', res);
});

//endpoint usuarios
app.get('/usuarios/:id?', (req, res) => {
    let filter = '';
    if (req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM Usuarios' + filter, res);
});

app.delete('/usuarios/:id', (req, res) => {
    execSQLQuery('DELETE FROM Usuarios WHERE ID=' + parseInt(req.params.id), res);
});

app.post('/usuarios', (req, res) => {
    var usuarios = req.body;
    // res.send(usuarios);
    // console.log(usuarios);
    // console.log(usuarios['nome']);
    // console.log(usuarios['email']);
    // console.log(usuarios['senha']);
    // console.log(usuarios['tipousuario']);
    // console.log("chegou aqui");

    // const nome = req.body.nome.substring(0,150);
    // const email = req.body.email.substring(0,200);
    // const senha = req.body.senha.substring(0,10)
    // const tipousuario = req.body.tipousuario.substring(0,10)
    execSQLQuery(`INSERT INTO usuarios(nome, email, senha, tipousuario) VALUES(
        '${usuarios['nome']}',
        '${usuarios['email']}',
        '${usuarios['senha']}',
        '${usuarios['tipousuario']}')`, res);
});

app.patch('/usuarios/:id', (req, res) => {
    var usuarios = req.body;

    // const id = parseInt(req.params.id);
    // const nome = req.body.nome.substring(0, 150);
    // const email = req.body.email.substring(0, 200);
    // const senha = req.body.senha.substring(0, 10);
    execSQLQuery(`UPDATE Usuarios SET 
        Nome='${usuarios['nome']}',
        Email='${usuarios['email']}',
        Senha='${usuarios['senha']}'
        WHERE ID=${usuarios['id']}`, res);
});

//endpoint techshots
// getUsuarios(app) {
//     axios.get(`\techshots`)
//       .then(response => {
//         const techshot = response.data;
//         let options = [];
//         let i = 0;
//         // mapear usuarios em options
//         techshot.map(
//           // eslint-disable-next-line
//           techshot => {
//             options[i] = { value: techshot.id, label: techshot.titulo };
//             i++;
//           }
//         )

//         this.setState({ options });
//     });
// };

app.get('/techshots', (req, res) => {
    var techshots = req.body;
    execSQLQuery('SELECT * FROM Techshots', res);
    
});

app.get('/techshots/:id?', (req, res) => {
    
    let filter = '';
    if (req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM Techshots' + filter, res);
})

app.delete('/techshots/:id', (req, res) => {
    execSQLQuery('DELETE FROM Techshots WHERE ID=' + parseInt(req.params.id), res);
});

app.post('/techshots', (req, res) => {
    var techshots = req.body;
    // var techshots = req.body;
    // res.send(techshots);
    // console.log("chegou aqui")

    // const titulo = req.body.titulo.substring(0, 150);
    // const descricao = req.body.descricao.substring(0, 300);
    execSQLQuery(`INSERT INTO Techshots(Titulo, Descricao, Palestrante) VALUES(
        '${techshots['titulo']}',
        '${techshots['descricao']}',
        '${techshots['palestrante']}')`, res);
});

app.patch('/techshots/:id', (req, res) => {
    var techshots = req.body;
    // const id = parseInt(req.params.id);
    // const titulo = req.body.titulo.substring(0, 150);
    // const descricao = req.body.descricao.substring(0, 300);
    // const palestrante = req.body.palestrante.substring(0, 20);
    execSQLQuery(`UPDATE Techshots SET 
        Titulo='${techshots['titulo']}', 
        Descricao='${techshots['descricao']}',
        Palestrante='${techshots['palestrante']}') 
        WHERE ID=${techshots['id']}`, res);
});

