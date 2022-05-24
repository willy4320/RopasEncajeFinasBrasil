var cards = document.getElementById('cards')
const templateCard = document.getElementById('template-card').content
var fragment = document.createDocumentFragment()

//llamar localStorage
document.addEventListener('DOMContentLoaded', e => { 
    fetchData() 
});

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