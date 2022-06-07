var cards = document.getElementById('cards')

const preCol = document.getElementById('preCol')
const templatepreCarrito = document.getElementById('template-precarrito').content
const footer2 = document.getElementById('footerCarrito')
const templateFooter = document.getElementById('template-footer').content

var fragment = document.createDocumentFragment()


let carrito = {}





//llamar localStorage
document.addEventListener('DOMContentLoaded', e => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        console.log(carrito)
        pintarCarrito()
    }
});





cards.addEventListener('click', e => { addCarrito(e) });

preCol.addEventListener('click', e => { btnAumentarDisminuir(e) })

const addCarrito = e => {
    if (e.target.classList.contains('btn-dark')) {
        // console.log(e.target.dataset.id)
        //console.log(e.target.parentElement)
        setCarrito(e.target.parentElement)
        
        
    }
    e.stopPropagation()
}

const setCarrito = objeto =>{
    
    

    const producto = {
        
        id: objeto.querySelector('.btn-dark').dataset.id,
        imagen: objeto.querySelector('img').getAttribute('src'),
        titulo: objeto.querySelector('h5').textContent,
        talla: objeto.querySelector('span').textContent,
        precio: objeto.querySelector('h4').textContent,
        stock: objeto.querySelector('h3').textContent,
        cantidad: 1
    }
    
    
    console.log(producto.stock)


    
    if (carrito.hasOwnProperty(producto.id)) {
        
        producto.cantidad = carrito[producto.id].cantidad + 1
        
    }else{
        
    }
    
    carrito[producto.id] = { ...producto }
    
 
    pintarCarrito()

    
}


// Pintar carrito con productos seleccionados en ventana productos

const pintarCarrito = () => {
    preCol.innerHTML = ''

    Object.values(carrito).forEach(producto => {
        templatepreCarrito.querySelector('img').setAttribute("src", producto.imagen)
        templatepreCarrito.querySelector('.titulo').textContent = producto.titulo
        //templatepreCarrito.querySelector('.talla').textContent = producto.talla

        //botones start
        templatepreCarrito.querySelector('.cant').textContent = producto.cantidad
        templatepreCarrito.querySelector('.btn-info').dataset.id = producto.id
        templatepreCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templatepreCarrito.querySelector('.btn-eliminar').dataset.id = producto.id
        //botones end
        templatepreCarrito.querySelector('.subtotal').textContent = "$ "+(producto.precio * producto.cantidad)
        
        const clone = templatepreCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    preCol.appendChild(fragment)

    pintarFooter2()
    pintarFooter3()

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
        pintarCarrito()
    })

}



const footer3 = document.getElementById('footer3')
const templateFinalizar = document.getElementById('template-finalizar').content

const pintarFooter3 = () => {
    footer3.innerHTML = ''
    

    
    // sumar cantidad y sumar totales
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
    

    
    templateFinalizar.querySelector('.cantidadProductos').textContent = nCantidad
    templateFinalizar.querySelector('.totalCarrito').textContent = nPrecio

    const clone = templateFinalizar.cloneNode(true)
    fragment.appendChild(clone)

    footer3.appendChild(fragment)

}



const btnAumentarDisminuir = e => {
    // console.log(e.target.classList.contains('btn-info'))
    const producto = carrito[e.target.dataset.id]
    if (e.target.classList.contains('btn-info')) {
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        
        pintarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } else {
            carrito[e.target.dataset.id] = {...producto}
        }
        pintarCarrito()
        
    }

    if (e.target.classList.contains('btn-eliminar')) {
        
        producto.cantidad===0
        delete carrito[e.target.dataset.id]
        pintarCarrito()
        
    }
    
    e.stopPropagation()

   
}

