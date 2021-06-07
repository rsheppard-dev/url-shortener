require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./db/mongoose')
const URL = require('./models/url')

const app = express();


// Basic Configuration
const port = process.env.PORT;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {
  
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
