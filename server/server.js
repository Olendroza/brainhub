
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())

app.listen(3001, function() {
    console.log('listening on 3001')
  })

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
  })
  app.post('/', (req, res) => {
    console.log('req:')
    console.log(req.body.name)
    console.log(req.body.surname)
    console.log(req.body.email)
    console.log(req.body.date)
    if(req.body.name===undefined||req.body.surname===undefined||req.body.email===undefined||req.body.date===undefined){
      console.log('Data undefined!')
      res.status(400).send({
        message: 'Data undefined!'
     });
    }
    else{
      let entry ={
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        date: req.body.date
      }
      //mongo
      const MongoClient = require('mongodb').MongoClient;
      const uri = "mongodb+srv://admin:mag@brainhub-npjjm.mongodb.net/test?retryWrites=true&w=majority";
      const client = new MongoClient(uri, { useNewUrlParser: true });
      try{
        client.connect(err => {
        const eventDB = client.db("eventDB").collection("brainhub")
        console.log('conected to mongo')
        eventDB.insertOne(entry,function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
        });
      client.close();
      res.send({message: 'Mong OK!'})
      })
      } catch(err){
        console.log('err' + err)
        res.send({message:err.name})
      }
    }

    
  })