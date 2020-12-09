const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {mongoURI} = require('./keys')

const http = require('http').createServer(app)


const PORT = process.env.PORT || 3000

mongoose.connect(mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false,
    useCreateIndex:true
})

mongoose.connection.on('Connected',()=>{
    console.log("MongoDB is connected")
})
mongoose.connection.on('Error',(err)=>{
    console.log("MongoDB is Not connected",err)
})


require('./models/user')
require('./models/msg')
app.use(express.json())
app.use(require('./routes/userAuth'))

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/Chat', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        console.log(msg)
        socket.broadcast.emit('message', msg)        
    })

})