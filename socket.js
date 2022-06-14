const Contenedor = require('./contenedor');
const productos = new Contenedor('data.json');
const chat = new Contenedor('msj.json');


module.exports = (io) => {

    const arrayMsg = [];


    io.on('connection', (socket) => {

      //App productos
        socket.emit('productos' , productos.getAll());

        //App chat
        socket.on('enviando:mensaje', (data) => {
          
          io.sockets.emit('mensaje', {
            msg: data,
            user: socket.nickname
          });
        })

        socket.on('enviando:nick', (data, callback) => {

          
          if (arrayMsg.indexOf(data) !== -1) {
            callback(false)
          } else {
            callback(true)
            socket.nickname = data;
            arrayMsg.push(socket.nickname)
            io.sockets.emit('usernames', arrayMsg);
          }
        })

        socket.on('disconnect' , datos => {

          if (!socket.nickname) {
            return 
          } else {
            let idx = arrayMsg.indexOf(socket.nickname)
            arrayMsg.splice(idx , 1)
            io.sockets.emit('usernames', arrayMsg);
          }
           
        })
    })
    
}