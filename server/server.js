global.fetch = require('node-fetch')
const config = require('universal-config')
const Unspalsh = require('unsplash-js').default
const toJson = require('unsplash-js').toJson
const express = require('express')
const path = require('path')

const unsplash = new Unspalsh({
  applicationId: config.get('APPLICATION_ID'),
  secret: config.get('SECRET'),
  callbackUrl: config.get('CALLBACK_URL'),
})

const app = express()

app.get('/api/photos', (req, res) => {
  unsplash.photos
    .listPhotos(req.query.start, req.query.count)
    .then(toJson)
    .then(json => res.json(json))
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../client/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../client/build/index.html'))
})
