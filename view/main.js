
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
  let user = localStorage.getItem('user')
  socket.emit('enviando:mensaje', msg.value , fecha , user)
  msg.value = ''
})


//ESCUCHANDO Y PINTANDO DATA EN EL CHAT
socket.on('mensaje', (data) => {
  let mensajes = data.map(msj => {

    return(`<div><strong>${msj.date}</strong> ${msj.user}: ${msj.mensaje}</div>`)

  }).join(' ')

  ventanaChat.innerHTML = mensajes
})



//FORMULARIO DE INGRESO DE USUARIO
nickForm.addEventListener('submit', (e) => {
  e.preventDefault()
  if ( nickname.value == '') {
    nickError.innerHTML = `<div class="alert alert-danger">Error! Ingrese usuario</div>`
  } else {
    localStorage.setItem('user' , nickname.value)
    let user = localStorage.getItem('user')
    let objet = {
      name: user
    }
    divChat.style.display = "block"
    divForm.style.display = "none"
    socket.emit('user:name' , objet)
  }

})

socket.on('all-user' , data => {
  let usuariosConectados = data.map(user => {
    return (`<div>${user.name}</div>`)
  }).join('')

  usarnames.innerHTML = usuariosConectados
})