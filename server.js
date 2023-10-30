const express = require('express');
const app = express();

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
