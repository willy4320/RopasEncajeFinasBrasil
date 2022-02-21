const cards = document.getElementById('cards')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()
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
    console.log('fullProducto:', data)
    pintarCards(data)
}

// Pintar productos
const pintarCards = data => {
    data.forEach(item => {
        templateCard.querySelector('a').dataset.id = item.id
        templateCard.querySelector('img').setAttribute("src", item.imagen)
        templateCard.querySelector('span').textContent = item.marca
        templateCard.querySelector('h5').textContent = item.titulo
        templateCard.querySelector('h4').textContent = item.precio
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
        imagen: objeto.querySelector('img').getAttribute('src'),
        titulo: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('h4').textContent,
        cantidad: 1
        
    }
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = { ...producto }

    console.log(producto)

    localStorage.setItem('carrito', JSON.stringify(carrito)) 
}







    




