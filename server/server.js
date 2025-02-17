const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: '100mb' }));

const dataFile = 'books.json';

const loadBooks = () => {
    try {
        const data = fs.readFileSync(dataFile);
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const saveBooks = (books) => {
    fs.writeFileSync(dataFile, JSON.stringify(books, null, 2));
};

const deleteImage = (imagePath) => {
    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
    }
};

let books = loadBooks();

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/favorites', (req, res) => {
    const favoriteBooks = books.filter(b => b.favorite);
    res.json(favoriteBooks);
});

app.post('/books', (req, res) => {
    const { title, author, description, image, favorite = false } = req.body;
    const newBook = { id: books.length + 1, title, author, description, favorite };

    if (image) {
        const base64Data = image.replace(/^data:image\/[a-z]+;base64,/, '');
        const imagePath = `uploads/${Date.now()}-book-image.png`;
        fs.writeFileSync(imagePath, base64Data, 'base64');
        newBook.image = imagePath;
    }

    books.push(newBook);
    saveBooks(books);
    res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');

    const { title, author, description, image, favorite } = req.body;
    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    if (favorite !== undefined) book.favorite = favorite;

    if (image) {
        if (book.image) deleteImage(book.image);
        const base64Data = image.replace(/^data:image\/[a-z]+;base64,/, '');
        const imagePath = `uploads/${Date.now()}-book-image.png`;
        fs.writeFileSync(imagePath, base64Data, 'base64');
        book.image = imagePath;
    }

    saveBooks(books);
    res.json(book);
});

app.patch('/books/:id/favorite', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');

    book.favorite = !book.favorite;
    saveBooks(books);
    res.json(book);
});

app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).send('Book not found');

    const book = books[bookIndex];
    if (book.image) deleteImage(book.image);
    books.splice(bookIndex, 1);
    saveBooks(books);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}
