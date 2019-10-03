const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')

const app = express()
mongoose.connect('mongodb+srv://user:user@cluster0-0v0b4.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//req.query = Acessar query params
//req.params = Acessar params
//req.body = Acessar corpo da requisição

app.use(express.json())
app.use(routes)

app.listen(3030);


