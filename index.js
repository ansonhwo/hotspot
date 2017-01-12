// personal eventbrite oauth2 key: DHQHKAEPE3FV676PIJ42
// anonymous eventbrite oauth2 key: 3GY6HEPUMRWGWI3445SY
// https://www.eventbriteapi.com/v3/users/me/?token=MYTOKEN
const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')
const knex = require('knex')({
  client: 'postgresql',
  connection: {
    user: 'super',
    database: 'eventinfo'
  }
})
const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/search/events', (req, res) => {
  const urlquery = req.client.parser.incoming._parsedUrl.query
  const query = urlquery.substring(urlquery.indexOf('=') + 1).split('+')

  query.map((word) => {
    knex('allevents')
      .select()
      .whereIn('title', function() {
        this.select('title').from('allevents')
      })
      .orWhereIn('host', function() {
        this.select('host').from('allevents')
      })
      .orWhereIn('desc', function() {
        this.select('desc').from('allevents')
      })
      .then((result) => console.log(result))
  })

  res.send({ 'query': query })
})

// Moment testing
// console.log(moment(new Date(2017, 1, 24, 13, 30, 0)).format('MMM Do YYYY, h:mm:ss a'))

// A test fetch path
app.get('/other/2', (req, res) => {
  console.log(req.client.parser.incoming._parsedUrl)
})

app.listen(9999, () => { console.log('Listening on 9999') })
