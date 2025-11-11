const booksRepository = require('../repositories/books.repository');
const { 
    validateIsbn, 
    validateYear, 
    validatePositiveNumber, 
    validateRequiredString 
} = require('../utils/validators');
const { addBookLinks, addBooksCollectionLinks } = require('../utils/hateoas');

function getAllBooks({ genre, author } = {}) {
    let books = booksRepository.findAll();

    if (genre) {
        books = books.filter(book => book.genre.toLowerCase().includes(genre.toLowerCase()));
    }
    if (author) {
        books = books.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
    }

    const booksWithLinks = books.map(addBookLinks);

    return {
        items: booksWithLinks,
        ...addBooksCollectionLinks()
    };
}

function getBookByIsbn(isbn) {
    const { valid, error } = validateIsbn(isbn);
    if (!valid) throw new Error(error);

    const book = booksRepository.findByIsbn(isbn);
    if (!book) throw new Error('Book not found');

    return addBookLinks(book);
}

function createBook(bookData) {
    const { isbn, title, author, year, genre, availableCopies } = bookData;

    let result;
    result = validateRequiredString(title); if (!result.valid) throw new Error(result.error);
    result = validateRequiredString(author); if (!result.valid) throw new Error(result.error);
    result = validateIsbn(isbn); if (!result.valid) throw new Error(result.error);
    result = validateYear(year); if (!result.valid) throw new Error(result.error);
    result = validateRequiredString(genre); if (!result.valid) throw new Error(result.error);
    result = validatePositiveNumber(availableCopies); if (!result.valid) throw new Error(result.error);

    if (booksRepository.exists(isbn)) {
        throw new Error('Book with this ISBN already exists');
    }

    const newBook = {
        isbn, title, author, year, genre, availableCopies
    };

    booksRepository.create(newBook);

    return addBookLinks(newBook);
}

function updateBook(isbn, bookData) {
    const { valid, error } = validateIsbn(isbn);
    if (!valid) throw new Error(error);

    const book = booksRepository.findByIsbn(isbn);
    if (!book) throw new Error('Book not found');

    if (bookData.title) {
        let result = validateRequiredString(bookData.title);
        if (!result.valid) throw new Error(result.error);
    }
    if (bookData.author) {
        let result = validateRequiredString(bookData.author);
        if (!result.valid) throw new Error(result.error);
    }
    if (bookData.year !== undefined) {
        let result = validateYear(bookData.year);
        if (!result.valid) throw new Error(result.error);
    }
    if (bookData.availableCopies !== undefined) {
        let result = validatePositiveNumber(bookData.availableCopies);
        if (!result.valid) throw new Error(result.error);
    }

    const updatedBook = booksRepository.update(isbn, bookData);

    return addBookLinks(updatedBook);
}

function deleteBook(isbn) {
    const { valid, error } = validateIsbn(isbn);
    if (!valid) throw new Error(error);

    const book = booksRepository.findByIsbn(isbn);
    if (!book) throw new Error('Book not found');

    booksRepository.deleteByIsbn(isbn);

    return true;
}

module.exports = {
    getAllBooks,
    getBookByIsbn,
    createBook,
    updateBook,
    deleteBook
};