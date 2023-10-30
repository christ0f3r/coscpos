const express = require('express');
const mysql = require('mysql');
const app = express();

// Configure your database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err);
    return;
  }
  console.log('Connected to the database');
});

// Set your view engine to EJS
app.set('view engine', 'ejs');

// Define a route to fetch data from the database and render the EJS template
app.get('/', (req, res) => {
  // Replace the query with your SQL query to fetch data from the database
  const query = 'SELECT * FROM Ingrediant';

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing the query: ' + error);
      return;
    }

    // Render the EJS template with the data
    res.render('table.ejs', { data: results });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
