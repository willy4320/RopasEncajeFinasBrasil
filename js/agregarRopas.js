const cards = document.getElementById('cards')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()
const items = document.getElementById('items')
const templateCarrito = document.getElementById('template-carrito').content
let carrito = {}

// Eventos
// El evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado y parseado
document.addEventListener('DOMContentLoaded', e => { 
    fetchData() 
 
});

cards.addEventListener('click', e => { addCarrito(e) });

// Traer productos
const fetchData = async () => {
    const res = await fetch('../baseDatos/baseDatosRopa.json');
    const data = await res.json()
    pintarCards(data)
}

// Pintar productos
const pintarCards = data => {
    data.forEach(item => {
        templateCard.querySelector('a').dataset.id = item.id
        templateCard.querySelector('img').setAttribute("src", item.thumbnailUrl)
        templateCard.querySelector('span').textContent = item.brand
        templateCard.querySelector('h5').textContent = item.title
        templateCard.querySelector('h4').textContent = item.price
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
    
}

const addCarrito = e => {
    if (e.target.classList.contains('btn-dark')) {
        // console.log(e.target.dataset.id)
        // console.log(e.target.parentElement)
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

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
    pintarCarrito()
}

// Pintar carrito con productos seleccionados
const pintarCarrito = () => {
    items.innerHTML = ''

    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('.id').textContent = producto.id
        templateCarrito.querySelector('img').setAttribute("scr", producto.thumbnailUrl)
        templateCarrito.querySelector('.titulo').textContent = producto.title
        templateCarrito.querySelector('.precio').textContent = producto.price
        templateCarrito.querySelector('input').setAttribute("value",producto.cantidad)
        templateCarrito.querySelector('.subtotal').textContent = producto.price * templateCarrito.querySelector('input').getAttribute("value")
        
      
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    //pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}






    




