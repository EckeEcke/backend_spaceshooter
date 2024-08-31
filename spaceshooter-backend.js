const express = require('express')
const { MongoClient } = require("mongodb")
const cors = require('cors')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.listen(port, '0.0.0.0', () => {
    console.log(`Server Started at ${port}`)
})

let database
const uri = `mongodb+srv://ceckardt254:${process.env.DATABASE_PASSWORD}@cluster0.sen83.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

const run = async () => {
  try {
    database = client.db('js-shooter')
    const scores = database.collection('highscores')
  }
  catch {
    throw error
  }
}

run().catch(console.dir)




app.get('/', async (req, res) => {
  try {
    const highscores = await database.collection('highscores').find().toArray()
    res.json(highscores)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.post('/post', async (request,response) => {
  if(request.body.Player == undefined || request.body.Score == undefined) {
    response.status(500).send("Incomplete highscore data")
    return
  }

  try {
    const result = await database.collection('highscores').insertOne({
        Player: request.body.Player,
        Score: request.body.Score
    })
    response.json({ message: "Received request", result })
  } catch (err) {
    console.error(err);
    response.status(500).send("Error inserting data")
  }
})