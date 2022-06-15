const Contenedor = require('./contenedor');
const productos = new Contenedor('data.json');
const chat = new Contenedor('msj.json');


module.exports = (io) => {
    const arrayUsers = [];

    io.on('connection', (socket) => {

      //App productos
        socket.emit('productos' , productos.getAll());

        //App chat
        socket.on('enviando:mensaje', (data , fecha) => {
          
          io.sockets.emit('mensaje', {
            msg: data,
            user: socket.nickname,
            fecha: fecha
          });
        })

        socket.on('enviando:nick', (data, callback) => {
          if (arrayUsers.indexOf(data) !== -1) {
            callback(false)
          } else {
            callback(true)
            socket.nickname = data;
            arrayUsers.push(socket.nickname)
            io.sockets.emit('usernames', arrayUsers);
          }
        })

        socket.on('disconnect' , () => {

          if (!socket.nickname) {
            return 
          } else {
            let idx = arrayUsers.indexOf(socket.nickname)
            arrayUsers.splice(idx , 1)
            io.sockets.emit('usernames', arrayUsers);
          }
           
        })
    })
    
}