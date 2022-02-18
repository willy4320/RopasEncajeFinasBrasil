const items = document.getElementById('items')
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito ={}

//llamar localStorage
carrito = JSON.parse(localStorage.getItem('carrito'))
document.addEventListener('DOMContentLoaded', e => {
    if (localStorage.getItem('carrito')) {
        console.log(carrito)
        pintarCarrito()
    }
});

// Pintar carrito con productos seleccionados en ventana productos
const pintarCarrito = () => {
    items.innerHTML = ''

    Object.values(carrito).forEach(producto => {
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

  

