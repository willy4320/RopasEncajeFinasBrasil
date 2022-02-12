
const cards = document.getElementById('cards')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()
let carrito = {}

// Eventos
// El evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado y parseado
document.addEventListener('DOMContentLoaded', e => { 
    fetchData() 
 
});

// Traer productos
const fetchData = async () => {
    const res = await fetch('baseDatos/baseDatosRopa.json');
    const data = await res.json()
    console.log(data)
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
        console.log(fragment)
    })
    cards.appendChild(fragment)
    
}