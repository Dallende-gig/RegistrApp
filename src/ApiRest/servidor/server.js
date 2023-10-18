const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

const users = [
  { username: 'Diego', email: 'di.allende@duocuc.cl', password: '123456' },
  { username: 'Cam', email: 'al.grumi@duocuc.cl', password: '12345' },
  { username: 'Nicolas', email: 'ni@profesor.duoc.cl', password: '123456A' }
];

app.use(cors());

app.get('/api/forgotpassword/:email', (req, res) => {
  const email = req.params.email;
  const user = users.find(u => u.email === email);

  if (user) {
    res.json({ exists: true, user });
  } else {
    res.json({ exists: false });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
