const express = require('express'),
app = express()
const Preset = require('./models/preset')

app.use(express.urlencoded({extends: true}))
app.get('/api', (req,res)=> {
    Preset.find()
    .sort({createdAt: -1})
    .then(result => res.json(result))
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


const connect = process.env.MONGODB_URI
const PORT = process.env.PORT || 3001
mongoose.connect(connect,{useNewUrlParser: true, useUnifiedTopology: true})
.then(result => app.listen(PORT, ()=> {
    console.log('listning on port ',PORT)
})
)


// # Serve client react instead of backend 
// # Add the follwing code to your server file on the backend 
const path = require('path');
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// # Do the same for the following code. Your main server file that is.
// ** MIDDLEWARE ** //
const whitelist = ['http://localhost:3000', 'http://localhost:3001','https://powerful-citadel-39138.herokuapp.com/']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

