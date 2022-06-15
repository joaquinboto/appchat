
const socket = io()

//RENDERIZANDO PRODUCTOS
const renderProductos = (data) => {
  const html = data.map(element=> {
    return (`
    <tr>
    <td><img src="${element.imagen}" alt=""></td>
    <td>${element.nombre}</td>
    <td>${element.cantidad}</td>
</tr>
    `)
  }).join(' ')
  document.getElementById('productos').innerHTML = html
}

//ESCUCHANDO EL EVENTO DE NUEVO PRODUCTO
socket.on('productos' , (data) => {
  renderProductos(data)
})

//DOM
const formChat = document.getElementById('messages-form')
const msg = document.getElementById('message')
const ventanaChat = document.getElementById('chat')
const nickForm = document.getElementById('nick-form')
const nickname = document.getElementById('nick-name')
const nickError = document.getElementById('nick-error')
const btnNick = document.getElementById('nick-btn')
const usarnames = document.getElementById('usernames')
const divChat = document.getElementById('content-wrap')
const divForm = document.querySelector('.nick-wrap')


//var
let nick = ''

//CHAT
formChat.addEventListener('submit', (e) => {
  e.preventDefault()
  let fecha = new Date().toLocaleString()
  socket.emit('enviando:mensaje', msg.value , fecha )
  msg.value = ''

})


//ESCUCHANDO Y PINTANDO DATA EN EL CHAT
socket.on('mensaje', (data) => {
  let color = ''
  if (nick == data.user) {
    color = '#33ff88'
  } 
  ventanaChat.innerHTML += `<div class="msg-area mb-2 textoChat" style="background-color: ${color}"><p class="msg"> <span style="color: red">${data.fecha}</span> <b>${data.user}</b>: </br>${data.msg}</p></div>`
})



//FORMULARIO DE INGRESO DE USUARIO
nickForm.addEventListener('submit', (e) => {
  e.preventDefault()

  
  socket.emit('enviando:nick', nickname.value , data => {
    if(data){
      nick = nickname.value
      divChat.style.display = "block";
      divForm.style.display = "none";
      
    }else{
      nickError.innerHTML = '<div class="alert alert-danger">El nombre ya existe</div>'
    }
    nickname.value = ''
  })

  socket.on('usernames', (data) => {

    let colorUser = 'grey'
    let salir = ''

    usarnames.innerHTML = data.map(element => {

      if (element == nick) {
        colorUser = 'green'
        salir = '<button class="btn btn-danger btn-sm" "><a class="enlaceSalir" href="/">Salir</a></button>'
      } else {
        colorUser = 'grey'
        salir = ''
      }
      return `<p style="color=${colorUser}">${element} ${salir}</p>`
    }).join(' ')
  })
})