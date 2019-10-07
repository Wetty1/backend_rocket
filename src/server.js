const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')

const app = express()
const server = http.Server(app)
const io = socketio(server)


mongoose.connect('mongodb+srv://user:user@cluster0-0v0b4.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connectedUsers = {}
io.on('connection', socket => {
    console.log(socket.handshake.query)
    console.log('Usuario conectado', socket.id)

    const { user_id } = socket.handshake.query
    connectedUsers[user_id] = socket.id
})

app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers

    return next()
})
//req.query = Acessar query params
//req.params = Acessar params
//req.body = Acessar corpo da requisição
app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)

server.listen(3030);


