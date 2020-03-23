const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))
var db
app.use(bodyParser.json())
app.use(express.static('public'))


app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {quotes: result})
  })
})

MongoClient.connect('mongodb+srv://demo:demo@cluster0-eyipj.mongodb.net/test?retryWrites=true&w=majority', (err, client) => {
  if (err) return console.log(err)
  db = client.db('star-wars-quotes')
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').insertOne(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

app.set('view engine', 'ejs')
app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'Yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({name: req.body.name},
  (err, result) => {
    if (err) return res.send(500, err)
    res.send({message: 'A darth vadar quote got deleted'})
  })
})
