
const preCol = document.getElementById('preCol')
const templatepreCarrito = document.getElementById('template-precarrito').content
const footer2 = document.getElementById('footerCarrito')
const templateFooter = document.getElementById('template-footer').content


//llamar localStorage
document.addEventListener('DOMContentLoaded', e => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito2()
    }
});

preCol.addEventListener('click', e => { btnAumentarDisminuir(e) })

// Pintar carrito con productos seleccionados en ventana productos
const pintarCarrito2 = () => {
    preCol.innerHTML = ''

    Object.values(carrito).forEach(producto => {
        templatepreCarrito.querySelector('img').setAttribute("src", producto.imagen)
        templatepreCarrito.querySelector('.titulo').textContent = producto.titulo
        
        //botones start
        templatepreCarrito.querySelector('.cant').textContent = producto.cantidad
        templatepreCarrito.querySelector('.btn-info').dataset.id = producto.id
        templatepreCarrito.querySelector('.btn-danger').dataset.id = producto.id
        //botones end
        templatepreCarrito.querySelector('.subtotal').textContent = producto.precio * producto.cantidad
        
      
        const clone = templatepreCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    preCol.appendChild(fragment)

    pintarFooter2()

    localStorage.setItem('carrito', JSON.stringify(carrito))

}

const pintarFooter2 = () => {
    footer2.innerHTML = ''
    
    if (Object.keys(carrito).length === 0) {
        footer2.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío</th>
        `
        return
    }
    
    // sumar cantidad y sumar totales
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
    // console.log(nPrecio)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer2.appendChild(fragment)

    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        pintarCarrito2()
    })

}

const btnAumentarDisminuir = e => {
    // console.log(e.target.classList.contains('btn-info'))
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        pintarCarrito2()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } else {
            carrito[e.target.dataset.id] = {...producto}
        }
        pintarCarrito2()
    }
    e.stopPropagation()
}




  

