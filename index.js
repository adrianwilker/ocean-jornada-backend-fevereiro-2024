const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

const dbUrl = 'mongodb+srv://adrianwilker:15042001@ocean-jornada-backend-f.sn5cyha.mongodb.net'
const dbName = 'ocean-jornada-backend-fevereiro-2024'

async function main() {

  const client = new MongoClient(dbUrl)
  const db = client.db(dbName)
  const collection = db.collection('items')

  console.log("Conectando ao banco de dados...")
  await client.connect()
  console.log("Banco de dados conectado com sucesso!")
  
  const app = express()
  
  app.get('/', function (req, res) {
    res.send('Hello, World!!!')
  })

  app.get('/oi', function(req, res) {
    res.send('Olá, mundo!')
  })
  
  const list = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']

  app.get('/items', async function(req, res) {
    const items = await collection.find().toArray()
    res.send(items)
  })
  
  app.get('/items/:id', async function(req, res) {
    const id = req.params.id
    const item = await collection.findOne({
      _id: new ObjectId(id)
    })
    res.send(item)
  })

  // sinaliza que o corpo da requisição está em json
  app.use(express.json())

  app.post('/items', function(req, res) {
    const item = req.body.name
    list.push(item)
    res.send('Item adicionado com sucesso')
  })
  
  app.listen(3000)
}

main()