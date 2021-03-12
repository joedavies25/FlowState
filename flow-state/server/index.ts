import express from 'express';
import router from './router';
import connection from './model/index';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(router);

(async () => {
  try {
    await connection;
    console.log('Connected to database');
    app.listen(PORT, () =>
      console.log(`Server Running At http://localhost:${PORT} 🚀`),
    );
  } catch (e) {
    console.log(e);
  }
})();
