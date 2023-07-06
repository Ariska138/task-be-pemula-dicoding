const fs = require('fs');
const { nanoid } = require('nanoid');

let data = [];

// Fungsi untuk menambahkan data buku baru
module.exports.addBook = (book) => {
  // const data = loadData();
  const bookId = nanoid();
  const newBook = {
    ...book,
    id: bookId,
    insertedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  newBook.finished = newBook.pageCount === newBook.readPage;

  data.push(newBook);
  newBook.bookId = bookId;

  return newBook;
};

// Fungsi untuk menghapus buku berdasarkan ID
module.exports.removeBook = (bookId) => {
  data = data.filter((book) => book.id !== bookId);
};

// Fungsi untuk mengubah data buku berdasarkan ID
module.exports.updateBook = (bookId, updatedData) => {
  data = data.map((book) => {
    if (book.id === bookId) {
      // Set nilai updatedAt saat buku diperbarui
      book.finished = book.pageCount === book.readPage;
      // book.reading = book.pageCount !== book.readPage;
      return { ...book, ...updatedData, updatedAt: new Date().toISOString() };
    }
    return book;
  });
};

// Fungsi untuk mendapatkan data buku berdasarkan ID
module.exports.getBookById = (bookId) => {
  let book = data.find((book) => book.id === bookId);
  return book;
};

module.exports.getBooksWithReading = (reading) => {
  console.log('data: ', data, ', reading: ', reading);
  let books = data.filter((book) => book.reading === reading);
  console.log('books: ', books);
  books = books.map((book) => {
    return { id: book.id, publisher: book.publisher, name: book.name };
  });
  return books;
};

module.exports.getBooksWithName = (value) => {
  console.log('data: ', data, ', value: ', value);
  let books = data.filter((book) => book.name.includes(value));
  console.log('books: ', books);

  books = books.map((book) => {
    return { id: book.id, publisher: book.publisher, name: book.name };
  });
  return books;
};

module.exports.getBooksWithFinished = (value) => {
  console.log('data: ', data, ', value: ', value);

  let books = data.filter((book) => book.finished === value);
  console.log('books: ', books);

  books = books.map((book) => {
    return { id: book.id, publisher: book.publisher, name: book.name };
  });
  return books;
};
// Fungsi untuk mendapatkan seluruh data buku
module.exports.getAllBooks = () => {
  return data.map((book) => {
    return { id: book.id, publisher: book.publisher, name: book.name };
  });
};
