import connection from './model/index';
import app from './app';

const PORT = 3001;

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
