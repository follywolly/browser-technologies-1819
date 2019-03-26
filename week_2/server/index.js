require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const utils = require('./utils/index.js')
// const session = require('express-session')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'static')))

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }
// }))




app.get('/', async (req, res, next) => {
  console.log(req.query.q)
  let results
  if (req.query.q) {
    results = await utils.locations(req.query.q)
  }
  res.render(path.join(__dirname, 'views/pages/index'), {
    query: req.query.q,
    results
  })
})
app.get('/result', async (req, res, next) => {
  console.log(req.query.q, req.query.c)
  let steps
  if (req.query.c) {
    steps = await utils.steps(req.query.c)
  }
  res.render(path.join(__dirname, 'views/pages/result'), {
    query: req.query.q,
    steps
  })
})

app.post('/search', (req, res, next) => {
  const query = encodeURI(req.body.query)
  console.log(query);
  if (query) {
    res.redirect('/?q=' + query)
  } else {
    res.redirect('/')
  }
})

app.listen(3000, ()=>{
  console.log('server listening on localhost:3000');
})
