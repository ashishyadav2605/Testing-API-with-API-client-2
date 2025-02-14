const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data.json');
const app = express();
app.use(bodyParser.json());
app.use(express.json());

// ========================= Code Goes Here ==================== //

app.post('/books' , (req, res) => {
  const {book_id, title, author, genre, year, copies} = req.body;

  if (!book_id || !title || !author || !genre || !year || !copies) {
    return res.status(400).json({message: "Bad request need data"})
  }

  const newBook = { book_id, title, author, genre, year, copies }

  data.push(newBook)

  return res.status(201).json({
    success:true,
    Book:newBook
  })
})

// ============================= GET REQUEST ======================= // 

app.get('/books', (req, res) => {
  try {
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
})

// ====================== GET REQUEST FOR ID ====================== //
app.get('/books/:id', (req, res) => {

  const book = data.find(e => e.book_id === req.params.id)

  if (!book) {
    return res.status(404).json({message: "Book not found"})
  }

  res.status(200).json(book);
})

// ============================== PUT REQUEST ================================ //

app.put('/books/:id', (req, res) => {
  const index = data.findIndex(e => e.book_id === req.params.id);

  if (index === -1){
    return res.status(404).json("Book not found")
  }

  data[index] = {...data[index], ...req.body}
  res.status(200).json(data[index]);

})

// =============================== DELETE REQUEST ================================ //

app.delete('/books/:id', (req, res) => {
  const del = data.findIndex(e => e.book_id === req.params.id );

  if(del === -1){
    return res.status(404).json("Book doesn't exist")
  }

  data.splice(del, 1);

  res.status(200).json({message: "Book deleted successfully"});

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
