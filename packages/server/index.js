// eslint-disable-next-line node/no-unpublished-require
const jsonServer = require('json-server');
const path = require('path');
const players = require(path.join(__dirname, 'mocks/users.json'));

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router(path.join(__dirname, 'mocks/db.json'));

server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === 'POST') {
    if(req.path === '/login') {
      const { username, password } = req.body;

      if (username in players && players[username].password === password) {
        const player = Object.assign({}, players[username]);
        delete player.password;

        res.status(200).json({
          status: 'success',
          player
        });
      } else {
        res.status(200).json({
          status: 'error',
          error: 'player does not exist or wrong password'
        });
      }
    } else if (req.path === '/logout') {
      res.status(200).json({
        status: 'success'
      });
    }
  } else {
    next();
  }
});

server.use(router);

server.listen(3001, () => {
  console.log("JSON Server is running");
});
