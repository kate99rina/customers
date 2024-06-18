const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(express.static('public'));
app.use(cors());

app.use(cors({
  origin: 'http://localhost:63342', // Allow only requests from this origin
  methods: ['GET', 'POST'], // Allow only GET and POST requests
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow only specified headers
  optionsSuccessStatus: 200
}));

const mysql = require('mysql2');

let connection;

console.log('Query from script');
const fs = require('fs');

const sqlFileContent = fs.readFileSync('./scripts/create-tables.sql', 'utf-8');

const queries = sqlFileContent.split(';');

queries.forEach((query, index) => {
  if (query.trim() !== '') {

    connection = mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: 'secret',
      database: 'customers',
      port: '3306'
    });

    connection.connect((err) => {
      if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
      }
      console.log('Connected to database as id ' + connection.threadId);
    });

    const trimmedQuery = query.trim();
    console.log(`Executing query ${index + 1}: ${trimmedQuery}`);

    connection.query(trimmedQuery, (err, results) => {
      if (err) {
        console.error(`Error executing query ${index + 1}:`, err);
      } else {
        console.log(`Query ${index + 1} executed successfully`);
      }
    });
  }

  connection.end((err) => {
    if (err) {
      console.error('Error closing database connection: ' + err.stack);
      return;
    }
    console.log('Database connection closed.');
  });
});


app.get('/api/data', (req, res) => {

  connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'secret',
    database: 'customers',
    port: '3306'
  });
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database: ' + err.stack);
      return;
    }
    console.log('Connected to database as id ' + connection.threadId);
  });
  const user = 'Трофимов Сергей Александрович';//todo
  connection.query('SELECT account_number, surname, name, patronymic, birth_date, inn, status FROM customers WHERE customers.user_full_name = \'' + user + '\'', (err, results, fields) => {
    if (err) {
      console.error('Error querying database: ' + err.stack);
      return;
    }
    console.log('Query result:', results);

    res.json(results);
  });

  connection.end((err) => {
    if (err) {
      console.error('Error closing database connection: ' + err.stack);
      return;
    }
    console.log('Database connection closed.');
  });


});

app.post('/api/update', (req, res) => {
  connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'secret',
    database: 'customers',
    port: '3306'
  });
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database: ' + err.stack);
      return;
    }
    console.log('Connected to database as id ' + connection.threadId);
  });
  
  const { status, accountNumber } = req.body; 

  const sql = 'UPDATE customers SET status = ? WHERE account_number = ?)';
  const values = [status, accountNumber];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error creating post');
      return;
    }
    console.log('Created new post with ID:', result.insertId);
    res.status(200).send('Post created successfully');
  });

  // Close the connection
  connection.end((err) => {
    if (err) {
      console.error('Error closing database connection: ' + err.stack);
      return;
    }
    console.log('Database connection closed.');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});




