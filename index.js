// personal eventbrite oauth2 key: DHQHKAEPE3FV676PIJ42
// anonymous eventbrite oauth2 key: 3GY6HEPUMRWGWI3445SY
// https://www.eventbriteapi.com/v3/users/me/?token=MYTOKEN
const express = require('express')
const bodyParser = require('body-parser')
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
  const query = urlquery.substring(urlquery.indexOf('=') + 1).replace(/[+]/g, ' ')

  knex('allevents')
    .where('title', 'ilike', `%${query}%`)
    .orWhere('host', 'ilike', `%${query}%`)
    .orWhere('desc', 'ilike', `%${query}%`)
    .then((result) => {
      console.log(result)
      res.json(result)
    })
    .catch((err) => res.sendStatus(404))
})

app.listen(9999, () => { console.log('Listening on 9999') })
