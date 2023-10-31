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
  port: 3306
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


// In your Express route handler
app.get('/sales-report', function(req, res) {
  // Sample sales data with date information
  var salesData = [
      { date: '2023-10-01', grossSales: 1000, discounts: 100, netSales: 900, tax: 90, creditCard: 500, debit: 300, cash: 100 },
      { date: '2023-10-02', grossSales: 1200, discounts: 150, netSales: 1050, tax: 105, creditCard: 600, debit: 350, cash: 100 },
      { date: '2023-10-03', grossSales: 800, discounts: 80, netSales: 720, tax: 72, creditCard: 400, debit: 200, cash: 120 },
      // Add more sales data as needed
  ];

  res.render('sales_view', { salesData: salesData });
});

// Handle the form submission to filter data based on the selected time period
app.post('/generate-report', function(req, res) {
  const startDate = new Date(req.body.startDate);
  const endDate = new Date(req.body.endDate);

  // Filter the sample sales data based on the selected time period
  const filteredSalesData = salesData.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
  });

  res.render('sales_view', { salesData: filteredSalesData });
});
 
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
