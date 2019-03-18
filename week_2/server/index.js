const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
// const session = require('express-session')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }
// }))
const routes = [
  {
    step: 1,
    direction: 'north-west',
    distance: '400m',
    street: 'Kalverstraat'
  },
  {
    step: 2,
    direction: 'north',
    distance: '100m',
    street: 'Spui'
  }
]

app.set('view engine', 'ejs')

app.get('/', (req, res, next) => {
  console.log(req.query.q)
  // post it to maps api
  // return data
  res.render(path.join(__dirname, 'views/pages/index'), {
    title: 'Hello World from index.js',
    query: req.query.q,
    routes: req.query.q ? routes : []
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
