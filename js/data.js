var cards = document.getElementById('cards')
const templateCard = document.getElementById('template-card').content
var fragment = document.createDocumentFragment()

//llamar localStorage
document.addEventListener('DOMContentLoaded', e => {
    fetchData()
});

// Traer productos
const fetchData = async () => {
    const res = await fetch('https://api-ropas-nodejs.herokuapp.com/baseDatosRopa.json');
    const data = await res.json()


    console.log('fullProducto:', data)

    //gerenciarStock(data, 10, 30)
    pintarCards(data)

}

// Pintar productos
const pintarCards = data => {
    data.forEach(item => {

        //console.log("data: "+item.stock)
        if (item.stock != 0) {


            templateCard.querySelector('a').dataset.id = item.id
            templateCard.querySelector('img').setAttribute("src", item.imagen)
            templateCard.querySelector('span').textContent = "Talla " + item.talla
            templateCard.querySelector('h5').textContent = item.titulo
            templateCard.querySelector('h4').textContent = item.precio
            templateCard.querySelector('h3').textContent = item.stock


            const clone = templateCard.cloneNode(true)
            fragment.appendChild(clone)
        }
    })
    cards.appendChild(fragment)
}



