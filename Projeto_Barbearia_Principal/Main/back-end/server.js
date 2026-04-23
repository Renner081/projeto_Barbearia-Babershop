const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'senhaSqL1nter',
  database: 'barbearia'
});

db.connect(err => {
  if (err) throw err;
  console.log('Banco conectado!');
});

// rota teste
app.get('/', (req, res) => {
  res.send("Backend funcionando!");
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});

app.get("/agendamentos/:idUsuario", (req, res) => {
  const idUsuario = req.params.idUsuario;

  const sql = `
    SELECT a.id_Agendamento, a.data_hora, a.status, b.Nome AS barbeiro
    FROM Agendamento a
    JOIN Barbeiro b ON a.id_Barbeiro = b.id_Barbeiro
    WHERE a.id_Usuario = ?
    ORDER BY a.data_hora DESC
  `;

  db.query(sql, [idUsuario], (err, result) => {
    if (err) {
      return res.json({ success: false, error: err });
    }

    res.json({ success: true, agendamentos: result });
  });
});

app.post('/registro', (req, res) => {
  const { nome, email, senha } = req.body;

  const sql = 'INSERT INTO Usuario (Nome, Email, Senha) VALUES (?, ?, ?)';
  db.query(sql, [nome, email, senha], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ msg: 'Usuário criado' });
  });
});

app.post("/cadastro", (req, res) => {
  const { nome, email, senha } = req.body;

  const sql = "INSERT INTO Usuario (Nome, Email, Senha) VALUES (?, ?, ?)";

  db.query(sql, [nome, email, senha], (err, result) => {
    if (err) {
      return res.json({
        success: false,
        error: err.sqlMessage
      });
    }

    res.json({
      success: true,
      user: { id_Usuario: result.insertId, Nome: nome, Email: email }
    });
  });
});

app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  const sql = 'SELECT * FROM Usuario WHERE Email = ? AND Senha = ?';
  db.query(sql, [email, senha], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      res.json({ success: true, user: result[0] });
    } else {
      res.json({ success: false });
    }
  });
});

app.post("/agendar", (req, res) => {
  const { id_Usuario, id_Barbeiro, data_hora } = req.body;

  const sql = `
    INSERT INTO Agendamento (id_Usuario, id_Barbeiro, data_hora)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [id_Usuario, id_Barbeiro, data_hora], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, error: err.sqlMessage });
    }

    res.json({
      success: true,
      msg: "Agendamento criado com sucesso",
      id: result.insertId
    });
  });
});