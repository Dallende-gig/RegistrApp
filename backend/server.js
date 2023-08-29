const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: '192.168.1.88',  // Utiliza tu dirección IP local
  user: 'root',
  password: '',
  database: 'registrapp'
});


db.connect(err => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Ruta para el inicio de sesión
app.post('/api/login', (req, res) => {
  const { usuario, contrasena } = req.body;

  // Validar que se proporcionaron el usuario y la contraseña
  if (!usuario || !contrasena) {
    return res.status(400).json({ error: 'Faltan datos de usuario o contraseña' });
  }

  const query = `SELECT * FROM usuarios WHERE user = ? AND pass = ?`;
  db.query(query, [usuario, contrasena], (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    try {
      if (result.length > 0) {
        res.json({ message: 'Inicio de sesión exitoso' });
      } else {
        res.status(401).json({ error: 'Credenciales inválidas' });
      }
    } catch (error) {
      console.error('Error al procesar el resultado de la consulta:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });
});

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
