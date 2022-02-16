/*
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
 */

const items = document.getElementById('items')
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito ={}

carrito = JSON.parse(localStorage.getItem('carrito'))
document.addEventListener('DOMContentLoaded', e => {
    if (localStorage.getItem('carrito')) {

        console.log(carrito)
        pintarCarrito()
    }
});



// Pintar carrito con productos seleccionados
const pintarCarrito = () => {
    items.innerHTML = ''

    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('.id').textContent = producto.id
        templateCarrito.querySelector('img').setAttribute("src", producto.thumbnailUrl)
        templateCarrito.querySelector('.titulo').textContent = producto.title
        templateCarrito.querySelector('.precio').textContent = producto.price
        templateCarrito.querySelector('input').textContent = producto.cantidad
        templateCarrito.querySelector('.subtotal').textContent = producto.price * producto.cantidad
        
      
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    //pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}


