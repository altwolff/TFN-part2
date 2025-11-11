const booksService = require('../services/books.service');

async function getAllBooks(req, res, next) {
    try {
        const { genre, author } = req.query;
        const result = booksService.getAllBooks({ genre, author });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

async function getBookByIsbn(req, res, next) {
    try {
        const { isbn } = req.params;
        const book = booksService.getBookByIsbn(isbn);
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
}

async function createBook(req, res, next) {
    try {
        const bookData = req.body;
        const newBook = booksService.createBook(bookData);
        res.status(201).json(newBook);
    } catch (error) {
        next(error);
    }
}

async function updateBook(req, res, next) {
    try {
        const { isbn } = req.params;
        const bookData = req.body;
        const updatedBook = booksService.updateBook(isbn, bookData);
        res.status(200).json(updatedBook);
    } catch (error) {
        next(error);
    }
}

async function deleteBook(req, res, next) {
    try {
        const { isbn } = req.params;
        booksService.deleteBook(isbn);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllBooks,
    getBookByIsbn,
    createBook,
    updateBook,
    deleteBook
};