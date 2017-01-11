const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('index.html')
})

app.listen(9999, () => { console.log('Listening on 9999') })
