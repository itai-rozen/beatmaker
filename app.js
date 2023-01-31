const express = require('express'),
app = express()
const cors = require('cors')
require('dotenv').config()
const Preset = require('./models/preset')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extends: true}))
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/client/public'))
  app.get('/.*/',(req,res) => res.sendFile(__dirname + '/client/public/index.html'))
}
app.get('/api', (req,res)=> {
    Preset.find()
    .sort({createdAt: -1})
    .then(result => res.json(result))
    .catch(err => console.error(err))
})

app.post('/api', (req,res)=> {
    const preset = new Preset(req.body)
    preset.save()
    .then(result => {
        res.redirect('/')
    })
    .catch(err => console.error(err)) 
})


const mongoose  = require('mongoose')




const connect = process.env.MONGODB_URI
const PORT = process.env.PORT || 3001
mongoose.connect(connect,{useNewUrlParser: true, useUnifiedTopology: true})
.then(result => app.listen(PORT, ()=> {
    console.log('listning on port ',PORT)
})
)

