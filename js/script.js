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