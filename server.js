import express from 'express';
import mariadb from 'mariadb';
import cors from 'cors';

const app = express();

app.use(cors());

const pool = mariadb.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'analikayn',
  database: 'db_test',
});

async function fetchData(query) {
    const connection = await pool.getConnection();
    const result = await connection.query(query);
    connection.release();
    return result;
}

app.get('/data', async (req, res) => {
    const data = await fetchData('SELECT * FROM t0');
      res.json(data);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
