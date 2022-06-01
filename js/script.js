const bar = document.getElementById('bar');
const leave = document.getElementById('leave');
const nav = document.getElementById('navbar');

if (bar) {
 bar.addEventListener ('click', () => {
    nav.classList.add('active');
  })

}

if (leave) {
    leave.addEventListener ('click', () => {
        nav.classList.remove('active');
    })
}



const preCarrito = document.getElementById('preCarrito');
const sideCart = document.getElementById('sideCart');
const sideCart2 = document.getElementById('sideCart2');
const leave2 = document.getElementById('leave2');


if (sideCart) {
  sideCart.addEventListener ('click', () => {
    preCarrito.classList.add('active');
   })
 }

 if (sideCart2) {
  sideCart2.addEventListener ('click', () => {
    preCarrito.classList.add('active');
   })
 }

if(leave2){
  leave2.addEventListener ('click', () => {
    preCarrito.classList.remove('active');
   })
}


 




