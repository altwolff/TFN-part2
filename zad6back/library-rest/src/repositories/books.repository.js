const books = [
    {
        isbn: '9781234567890',
        title: 'Wiedźmin: Ostatnie Życzenie',
        author: 'Andrzej Sapkowski',
        year: 1993,
        genre: 'Fantastyka',
        availableCopies: 4
    },
    {
        isbn: '9789876543210',
        title: 'Zbrodnia i kara',
        author: 'Fiodor Dostojewski',
        year: 1866,
        genre: 'Klasyka',
        availableCopies: 2
    },
    {
        isbn: '9781111111111',
        title: 'Lalka',
        author: 'Bolesław Prus',
        year: 1890,
        genre: 'Powieść',
        availableCopies: 3
    }
];

function findAll() {
    return books;
}

function findByIsbn(isbn) {
    return books.find(book => book.isbn === isbn) || null;
}

function create(book) {
    books.push(book);
    return book;
}

function update(isbn, bookData) {
    const index = books.findIndex(book => book.isbn === isbn);
    if (index === -1) return null;

    books[index] = { ...books[index], ...bookData };
    return books[index];
}

function deleteByIsbn(isbn) {
    const index = books.findIndex(book => book.isbn === isbn);
    if (index === -1) return false;
    books.splice(index, 1);
    return true;
}

function exists(isbn) {
    return books.some(book => book.isbn === isbn);
}

module.exports = {
    findAll,
    findByIsbn,
    create,
    update,
    deleteByIsbn,
    exists
};