var cards = document.getElementById('cards')
const templateCard = document.getElementById('template-card').content
var fragment = document.createDocumentFragment()
var data = [
    {
        "id": 10,
        "imagen": "../img/productos/ropa1.jpg",
        "marca": "marca",
        "titulo": "Esse produto tem stock",
        "precio": 20,
        "des": "descripcion",
        "talla":"L",
        "stock": 3
        
    },
    {
        "id": 1,
        "imagen": "../img/productos/ropa1.jpg",
        "marca": "marca",
        "titulo": "Titulo",
        "precio": 20,
        "des": "descripcion",
        "talla":"L",
        "stock": 2
        
    },
    {
        "id": 2,
        "imagen": "../img/productos/ropa1.jpg",
        "marca": "marca",
        "titulo": "Titulo",
        "precio": 20,
        "des": "descripcion",
        "talla":"S",
        "stock": 2
        
    },
    {
        "id": 3,
        "imagen": "../img/productos/ropa1.jpg",
        "marca": "marca",
        "titulo": "Titulo",
        "precio": 20,
        "des": "descripcion",
        "talla":"XL",
        "stock": 2
        
    },
    {
        "id": 4,
        "imagen": "../img/productos/ropa1.jpg",
        "marca": "marca",
        "titulo": "Titulo",
        "precio": 20,
        "des": "descripcion",
        "talla":"M",
        "stock": 2
        
    },
    {
        "id": 5,
        "imagen": "../img/productos/ropa1.jpg",
        "marca": "marca",
        "titulo": "Titulo",
        "precio": 20,
        "des": "descripcion",
        "talla":"S",
        "stock": 2
        
    },
    {
        "id": 6,
        "imagen": "../img/productos/ropa1.jpg",
        "marca": "marca",
        "titulo": "Titulo",
        "precio": 20,
        "des": "descripcion",
        "talla":"S",
        "stock": 2
        
    },
    {
        "id": 7,
        "imagen": "../img/productos/ropa1.jpg",
        "marca": "marca",
        "titulo": "Titulo",
        "precio": 20,
        "des": "descripcion",
        "talla":"S",
        "stock": 2
        
    },
    {
        "id": 8,
        "imagen": "../img/productos/ropa1.jpg",
        "marca": "marca",
        "titulo": "Titulo",
        "precio": 20,
        "des": "descripcion",
        "talla":"S",
        "stock": 2
        
    }
]

//llamar localStorage
document.addEventListener('DOMContentLoaded', e => { 
    fetchData() 
});

// Traer productos
const fetchData = async () => {
    //const res = await fetch('../baseDatos/baseDatosRopa.json');
    //const data = await res.json()
    //console.log('fullProducto:', data)

    console.log('fullProducto:', data)

    //gerenciarStock(data, 10, 30)
    pintarCards(data)
    
}

// Pintar productos
const pintarCards = data => {
    data.forEach(item => {

        //console.log("data: "+item.stock)
        if(item.stock != 0){
            
        
            templateCard.querySelector('a').dataset.id = item.id
            templateCard.querySelector('img').setAttribute("src", item.imagen)
            templateCard.querySelector('span').textContent = "Talla "+item.talla
            templateCard.querySelector('h5').textContent = item.titulo
            templateCard.querySelector('h4').textContent = item.precio
            templateCard.querySelector('h3').textContent = item.stock
    
            
            const clone = templateCard.cloneNode(true)
            fragment.appendChild(clone)
        }
    })
    cards.appendChild(fragment)  
}



