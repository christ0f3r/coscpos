const express = require('express');
const mysql = require('mysql');
const app = express();
/*

mysql -h cosc-pos-server.mysql.database.azure.com -u jbatac25 -p

*/
//attempting to connect to azure mysql server
const db = mysql.createPool({
  connectionLimit: 10, // You can adjust the limit based on your requirements
  host: "cosc-pos-server.mysql.database.azure.com",
  user: "jbatac25",
  password: "Josh2400!",
  database: "point_of_sales",
});

// Checking if the pool is valid
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database!');

  // Release the connection after you're done using it
  connection.release();
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/server_view', (req, res) => { //josh
  res.render('server_view');
});

app.get('/manager_view', (req, res) => {
  res.render('manager_view');
});

app.get('/inventory_view', (req, res) => {
  res.render('inventory_view');
});

app.get('/sales_view', (req, res) => {
  res.render('sales_view');
});


app.get('/inventory_Report', (req, res) => {
  // Replace the query with your SQL query to fetch data from the database
  const query = 'SELECT * FROM Ingredient;';
  db.query(query, (error, results) => { //attempt
    if (error) {console.error('Error executing the query: ' + error);return;}

    res.render('inventory_Report.ejs', { data: results });
  });
});

 
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
