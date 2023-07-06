const { getBookById } = require('../data');

module.exports = (request, response, id) => {
  let book = getBookById(id);

  if (book && Object.keys(book).length > 0) {
    response.statusCode = 200;
    response.end(
      JSON.stringify({
        status: 'success',
        data: { book },
      })
    );
    return;
  }

  response.statusCode = 404;
  response.end(
    JSON.stringify({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    })
  );
};
