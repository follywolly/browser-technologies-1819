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
  let steps
  if (req.query.q) {
    steps = await utils.retrieve(req.query.q)
  }
  res.render(path.join(__dirname, 'views/pages/index'), {
    title: 'Hello World from index.js',
    query: req.query.q,
    steps
  })
})

app.post('/search', (req, res, next) => {
  const query = encodeURI(req.body.query)
  setTimeout(() => {
    if (query) {
      res.redirect('/?q=' + query)
    } else {
      res.redirect('/')
    }
  }, 3000)
})

app.listen(3000, ()=>{
  console.log('server listening on localhost:3000');
})
