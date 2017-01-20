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
app.use(bodyParser.urlencoded({ extended: true }))

// Get a list of all events that match the search query
app.get('/search/events', (req, res) => {
  const urlquery = req.client.parser.incoming._parsedUrl.query
  const query = urlquery.substring(urlquery.indexOf('=') + 1).replace(/[+]/g, ' ')

  knex('allevents')
    .where('title', 'ilike', `%${query}%`)
    .orWhere('host', 'ilike', `%${query}%`)
    .orWhere('desc', 'ilike', `%${query}%`)
    .then((result) => { res.json(result) })
    .catch((err) => res.sendStatus(404))
})

// Get a list of existing users
app.get('/users', (req, res) => {
  knex('users')
    .then((result) => { res.json(result) })
    .catch((err) => res.sendStatus(404))
})

// Grab a list of randomized events
app.get('/featured', (req, res) => {
  knex('allevents')
    .orderByRaw('RANDOM()')
    .limit(6)
    .then((result) => { res.json(result) })
    .catch((err) => res.sendStatus(404))
})

// Returns a list of events the user is registered to
app.get('/events/reg/:email', (req, res) => {
  knex('users')
    .select('registered')
    .where('email', req.params.email)
    .then((result) => { res.json(result) })
    .catch((err) => res.sendStatus(404))
})

// Update event registration for a user
app.put('/users/reg', (req, res) => {
  let regStatus
  let { id, email } = req.body
  id = parseInt(id)

  knex('users')
    .select('registered')
    .where('email', email)
    .then((result) => {
      console.log('SELECT registered FROM users WHERE email')
      const regList = result[0].registered

      // If the user isn't currently registered, add event id
      if (regList.length === 0 || !regList.includes(id)) {
        console.log('user isn\'t registered, add event id')
        regList.push(id)
        regStatus = true
      }
      // If the user is registered, remove that event id from the user
      else {
        const index = regList.indexOf(id)
        console.log('user is registered, remove event id')
        if (index > -1) {
          regList.splice(index, 1)
          regStatus = false
        }
      }

      const query = knex('users')
        .where('email', email)
        .update({
          registered: regList
        })

      return query
    })
    .then( _ => {
      console.log('sending response')
      res.status(200).json({ registered: regStatus })
    })
    .catch((err) => res.sendStatus(404))
})

app.listen(9999, () => { console.log('Listening on 9999') })
