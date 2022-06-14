const express = require('express');
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)
require('./socket')(io)
app.set('views' , './view');
app.set('view engine', 'ejs');
app.use(express.static('view'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const Contenedor = require('./contenedor');
const productos = new Contenedor('data.json');

app.get('/', (req, res) => {
  res.render('index');

})
app.post('/productos' , (req , res) => {
    productos.save(req.body)
    res.redirect('/')
})

app.post('/chat' , (req , res) => {
    chat.save(req.body)
    res.redirect('/')
})


server.listen(8080, () => {
  console.log('Servidor corriendo en http://localhost:8080');
});

