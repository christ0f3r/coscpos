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


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
