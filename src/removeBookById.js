const { getBookById, removeBook } = require('../data');

module.exports = (request, response, id) => {
  let book = getBookById(id);

  if (!book || Object.keys(book).length === 0) {
    response.statusCode = 404;
    response.end(
      JSON.stringify({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      })
    );
    return;
  }

  removeBook(id);

  response.statusCode = 200;
  response.end(
    JSON.stringify({
      status: 'success',
      message: 'Buku berhasil dihapus',
    })
  );
};
