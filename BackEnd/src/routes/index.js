const express = require('express');
const router = express.Router();
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const json_books = fs.readFileSync('src/baseDatosRopa.json', 'utf-8');
let books = JSON.parse(json_books);

router.get('/', (req, res) => {
  res.render('index', { books });
});

router.get('/new-entry', (req, res) => {
  res.render('new-entry');
});

router.post('/new-entry', (req, res) => {

  const { titulo, imagen, precio, talla, stock, des } = req.body;

  if (!titulo || !imagen || !precio || !talla || !stock || !des) {
    res.status(400).send("Entries must have a titulo and body");
    return;
  }

  var newBook = {
    id: uuidv4(),
    titulo,
    imagen,
    precio,
    talla,
    stock,
    des
  };

  // add a new book to the array
  books.push(newBook);

  // saving the array in a file
  const json_books = JSON.stringify(books);
  fs.writeFileSync('src/baseDatosRopa.json', json_books, 'utf-8');

  res.redirect('/');
});

router.get('/delete/:id', (req, res) => {
  books = books.filter(book => book.id != req.params.id);

  // saving data
  const json_books = JSON.stringify(books);
  fs.writeFileSync('src/baseDatosRopa.json', json_books, 'utf-8');

  res.redirect('/')
});

module.exports = router;