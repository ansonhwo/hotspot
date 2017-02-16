const express = require('express')
const bodyParser = require('body-parser')

let knex
if (process.env.DATABASE_URL) {
  // Production
  knex = require('knex')({
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  })
}
else {
  // Development
  knex = require('knex')({
    client: 'postgresql',
    connection: {
      user: 'super',
      database: 'eventinfo'
    }
  })
}

const app = express()

const PORT = process.env.PORT || 9999

app.use(express.static('public'))
app.use(bodyParser.json())

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

app.post('/events/create', (req, res) => {
  const formData = req.body

  for (key in formData) {
    if (!formData[key]) delete formData[key]
  }
  knex('allevents')
    .insert(formData, 'title')
    .then((result) => { res.status(201).json(result) })
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
      // Checking list of events that the current user has registered for
      const regList = result[0].registered

      // If the user isn't currently registered, add event id
      if (regList.length === 0 || !regList.includes(id)) {
        regList.push(id)
        regStatus = true
      }
      // If the user is registered, remove that event id from the user
      else {
        const index = regList.indexOf(id)
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
      res.status(200).json({ registered: regStatus })
    })
    .catch((err) => res.sendStatus(404))
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
