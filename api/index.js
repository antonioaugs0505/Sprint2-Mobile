const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');

server.use(middlewares);
server.use(bodyParser.json());

// Middleware para simular delay de resposta (opcional, para simular uma API mais realista)
server.use((req, res, next) => {
  setTimeout(next, 200);
});

// Middleware para realizar login
server.post('/users/login', (req, res) => {
  const { email, password } = req.body;
  const user = router.db
    .get('users')
    .find({ email: email, password: password })
    .value();

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).json({ error: 'Email or password incorrect' });
  }
});

// Middleware para retornar um usuário pelo ID
server.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = router.db
    .get('users')
    .find({ id: userId })
    .value();

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Middleware para registrar um novo usuário
server.post('/users/register', (req, res) => {
  const { name, phone, email, password } = req.body;

  // Verificar se o email já está cadastrado
  const existingUser = router.db
    .get('users')
    .find({ email: email })
    .value();

  if (existingUser) {
    res.status(400).json({ error: 'Email already registered' });
  } else {
    const id = Date.now(); // Simples geração de ID
    const newUser = { id, name, phone, email, password };
    router.db.get('users').push(newUser).write();

    res.status(200).json(newUser);
  }
});

server.use(router);

const port = 3000;
server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`);
});
