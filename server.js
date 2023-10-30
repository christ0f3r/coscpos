const express = require('express');
const mysql = require('mysql');
const app = express();

var connection=mysql.createConnection(
  {
  host:"cosc-pos-server.mysql.database.azure.com", 
  user:"jbatac25", 
  password:"Josh2400!",
  database:"point_of_sales", 
  port:3306
  });

connection.connect((err) => {
  if (err) {
      console.error('Error connecting to database:', err);
      return;
  }
  console.log('Connected to MySQL database!');
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/server_view', (req, res) => {
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

app.get('/inventory_Report', (req, res) =>  {
  res.render('inventory_Report');
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
