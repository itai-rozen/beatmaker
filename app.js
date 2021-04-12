const express = require('express'),
app = express()
const path = require('path') 
const Preset = require('./models/preset')
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({extends: true}))
app.use(express.static(path.join(__dirname, 'client/build')));

app.get(`/api`, (req,res)=> {
    Preset.find()
    .sort({createdAt: -1})
    .then(result => res.json(result))
    .catch(err => console.error(err))
})

app.post(`/api`, (req,res)=> {
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
app.set('view engine', 'ejs')


const connect = process.env.MONGODB_URI
const PORT = process.env.PORT || 3001
mongoose.connect(connect,{useNewUrlParser: true, useUnifiedTopology: true})
.then(result => app.listen(PORT, ()=> {
    console.log('listening on port ',PORT)
})
)

