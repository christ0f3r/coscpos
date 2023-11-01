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
app.use(express.urlencoded({ extended: true })); // Middleware to parse POST request body

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/failed_login', (req, res) => {
  res.render('failed_login');
});

app.get('/login_view', (req, res) => {
  res.render('login_view');
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
  db.query('SELECT DateAndTime, TotalPrice FROM transaction', (err, results) => {
    if (err) throw err;
    const data = results.map((row) => ({
      date: row.date,
      amount: row.amount,
    }));

    res.render('sales_view.ejs', { data });
  });
});

app.get('/manage_employee_view', (req, res) => {
  res.render('manage_employee_view');
});

app.get('/modify_inventory', (req, res) => {
  res.render('modify_inventory');
});

app.get('/inventory_Report', (req, res) => { //santiago's
  // Replace the query with your SQL query to fetch data from the database
  const query = 'SELECT * FROM Ingredient;';
  db.query(query, (error, results) => { //attempt
    if (error) {console.error('Error executing the query: ' + error);return;}

    res.render('inventory_Report.ejs', { data: results });
  });
});

app.post('/login', (req, res) => { //josh
  const username = req.body.username;
  const password = req.body.password;

  // Query your database for authentication using 'credentials' table
  const query = 'SELECT employeeID, isManager FROM credentials WHERE employeeID = ? AND password = ?';
  db.query(query, [username, password], (error, results, fields) => {
    if (error) {
      res.send('An error occurred during login');
      throw error;
    }
    if (results.length > 0) {
      const user = results[0]; // Assuming there's only one user with this ID

      if (user.isManager) {
        // Manager login
        res.redirect('/');
      } else {
        // Non-manager login
        res.redirect('/server_view');
      }
    } else {
      // Failed login
      res.redirect('/failed_login'); //  a failed login view
    }
  });
});

 
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/login_view');
});
