const { getAllBooks } = require('../data');

module.exports = (request, response) => {
  const books = getAllBooks();
  response.statusCode = 200;
  response.end(
    JSON.stringify({
      status: 'success',
      data: { books },
    })
  );
};
