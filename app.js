const express = require('express'),
app = express()
const Preset = require('./models/preset')

app.use(express.urlencoded({extends: true}))


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "/"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.get('/', (req,res)=> {
    Preset.find()
    .sort({createdAt: -1})
    // .then(result => res.json(result))
    .then(result => res.render("/"))
    .catch(err => console.error(err))
})

app.post('/api', (req,res)=> {
    const preset = new Preset(req.body)
    console.log(req.body)
    preset.save()
    .then(result => {
        res.redirect('/')
    })
    .catch(err => console.error(err)) 
})
  


const mongoose  = require('mongoose')

require('dotenv').config()


const connect = 'mongodb+srv://itai_rozen:1234@cluster0.sihrb.mongodb.net/preset-list?retryWrites=true&w=majority'
const PORT = process.env.PORT || 3001
mongoose.connect(connect,{useNewUrlParser: true, useUnifiedTopology: true})
.then(result => app.listen(PORT, ()=> {
    console.log('listning on port ',PORT)
})
)

