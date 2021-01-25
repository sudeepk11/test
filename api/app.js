const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log(`${(new Date()).toISOString()}: ${req.method} ${req.url}`);
  next();
});

app.get('/api/search', (req, res) => {
  res.send({message: 'Hello world'});
});

module.exports = app;
