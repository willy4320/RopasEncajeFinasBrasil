const items = document.getElementById('items')
const templateCarrito = document.getElementById('template-carrito').content
let carrito = {}
const fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', e => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
});

// tomar productos al apretar boton de carrito
const setCarrito = objeto =>{
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        thumbnailUrl: objeto.querySelector('img').getAttribute('src'),
        title: objeto.querySelector('h5').textContent,
        price: objeto.querySelector('h4').textContent,
        cantidad: 1
        
    }
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = { ...producto }

    console.log(producto)
    //pintarCarrito()
}



// Pintar carrito con productos seleccionados
const pintarCarrito = () => {
    items.innerHTML = ''

    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('.id').textContent = producto.id
        //imagen
        templateCarrito.querySelector('.titulo').textContent = producto.title
        templateCarrito.querySelector('.precio').textContent = producto.price
        templateCarrito.querySelector('.size').textContent = producto.size
        templateCarrito.querySelector('input').textContent = producto.cantidad
        templateCarrito.querySelector('.subtotal').textContent = producto.price * producto.cantidad
        
      
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    //pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}