const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

const dbUrl = 'mongodb+srv://adrianwilker:15042001@ocean-jornada-backend-f.sn5cyha.mongodb.net'
const dbName = 'ocean-jornada-backend-fevereiro-2024'

async function main() {

  const client = new MongoClient(dbUrl)
  const db = client.db(dbName)
  const collection = db.collection('animals')

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

  app.post('/items', async function(req, res) {
    const item = req.body
    await collection.insertOne(item)
    res.send(item)
  })

  app.put('/items/:id', async function(req, res) {
    const newItem = req.body
    await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: newItem }
    )
    res.send('Item atualizado com sucesso.')
  })
  
  app.delete('/items/:id', async function(req, res) {
    collection.deleteOne({ _id: new ObjectId(req.params.id) })
    res.send('Item removido com sucesso.')
  })
  
  app.listen(3000)
}

main()