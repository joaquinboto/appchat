const Contenedor = require('./contenedor');
const productos = new Contenedor('data.json');
const chat = new Contenedor('msj.json');
const usernames = new Contenedor('usuarios.json')


module.exports = (io) => {

    io.on('connection', (socket) => {

      //App productos
        socket.emit('productos' , productos.getAll());

        //App chat
        socket.on('enviando:mensaje', (data , fecha , user) => {
          chat.save({
            mensaje: data,
            date: fecha,
            user: user
          })

          io.sockets.emit('mensaje' , chat.getAll())
        })

        socket.on('user:name' , data => {
          usernames.save(data)
          io.sockets.emit('all-user' , usernames.getAll() )
        })
    })
    
}