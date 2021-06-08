const path = require('path');
const dotenv = require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const URL = require('./models/url')

const app = express();

// connect to db
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: true
})

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

// create short url endpoint
app.post('/api/shorturl', async (req, res) => {
  const url = new URL(req.body)
  console.log(req)

  try {
    await url.save()
    res.status(201).send({ original_url, short_url })
  } catch (error) {
    res.status(400).send(error)
  }
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
