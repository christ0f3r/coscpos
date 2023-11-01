app.get('/', (req, res) => {
    db.query('SELECT date, amount FROM transaction_table', (err, results) => {
      if (err) throw err;
      const data = results.map((row) => ({
        date: row.date,
        amount: row.amount,
      }));
  
      res.render('graph', { data });
    });
  });