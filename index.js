const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello, World!!!')
})

app.get('/oi', function(req, res) {
    res.send('Olá, mundo!')
})

const list = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']

app.get('/items', function(req, res) {
  res.send(list)
})

app.get('/items/:id', function(req, res) {
  const id = req.params.id
  res.send(list[id])
})

app.listen(3000)