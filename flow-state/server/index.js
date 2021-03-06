const Express = require('express');
const cors = require('cors');
const connection = require('./model/index');
const router = require('./router');

const app = new Express();

app.use(cors());
app.use(Express.json());
app.use(router);

(async () => {
  try {
    await connection;
    console.log('Connected to database');
    app.listen('3001', () =>
      console.log('Server Running At http://localhost:3001 🚀'),
    );
  } catch (e) {
    console.log(e);
  }
})();
