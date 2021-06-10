require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require ('body-parser')
const validator = require('validator')
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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// create short url endpoint
app.post('/api/shorturl', async (req, res) => {
  const url = new URL({ original_url: req.body.url })

  if (!validator.isURL(url.original_url)) {
    return res.status(400).json({'error': 'invalid url'})
  }

  try {
    const {original_url, short_url} = await url.save()
    
    res.status(201).json({ original_url, short_url })
  } catch (error) {
    res.status(400).send(error)
  }
})

// use short url to redirect to original url endpoint
app.get('/api/shorturl/:short_url', async (req, res) => {
  const short_url = req.params.short_url
  const url = await URL.findOne({short_url})
  
  if (!url) {
    return res.status(400).json({'error': 'invalid url'})
  }

  res.redirect(url.original_url)
})


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
