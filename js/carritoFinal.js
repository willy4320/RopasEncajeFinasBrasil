
const finalizarCompra = document.getElementById('subtotal')

const preCol = document.getElementById('preCol')
const templatepreCarrito = document.getElementById('template-precarrito').content
const footer2 = document.getElementById('footerCarrito')
const templateFooter = document.getElementById('template-footer').content

const fragment = document.createDocumentFragment()
let carrito = {}
let data = {}
//llamar localStorage
carrito = JSON.parse(localStorage.getItem('carrito'))
document.addEventListener('DOMContentLoaded', e => {
    fetchData(data)
    if (localStorage.getItem('carrito')) {
        console.log(carrito)
        pintarCarrito2()
    }
    
});


const fetchData = async (data) => {
    const res = await fetch('https://api-ropas-nodejs.herokuapp.com/baseDatosRopa.json');
    data = await res.json()

    console.log('fullProducto:', data)
   
}

preCol.addEventListener('click', e => { btnAumentarDisminuir(e) })

finalizarCompra.addEventListener('click', e => { gerenciarStock(e) })




// Pintar carrito con productos seleccionados en ventana productos

const pintarCarrito2 = () => {
    preCol.innerHTML = ''

    Object.values(carrito).forEach(producto => {
        templatepreCarrito.querySelector('img').setAttribute("src", producto.imagen)
        templatepreCarrito.querySelector('.titulo').textContent = producto.titulo
        templatepreCarrito.querySelector('.talla').textContent = producto.talla
        
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
        pintarCarrito2()
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

    if (e.target.classList.contains('btn-eliminar')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad===0
        delete carrito[e.target.dataset.id]
        pintarCarrito2()
    }

    
    e.stopPropagation()
}


const gerenciarStock = e => {
    

    
    if (e.target.classList.contains('finalizarCompra')) {
        const producto = carrito[e.target.dataset.id]


      
        
            
        data.forEach(item => {
            if(item.id == producto.id && item.stock >= producto.cantidad){
                item.stock = item.stock-producto.cantidad
            }
            
        })
          
        

        // Pasar de Objeto js a JSON 
        console.log("Data Updated:", data)
        

        // Mandar JSON al Backend
        


        delete carrito[e.target.dataset.id]
        pintarCarrito2()
    }

    e.stopPropagation()

}






  

