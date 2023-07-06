const {
  getAllBooks,
  getBooksWithFinished,
  getBooksWithName,
  getBooksWithReading,
} = require('../data');

module.exports = (request, response, key, value) => {
  console.log('key: ', key, ', value:', value);
  let books = [];
  switch (key) {
    case 'reading':
      // Lakukan tindakan yang sesuai jika parameter query string reading=1
      books = getBooksWithReading(value === '1');
      break;
    case 'finnished':
      books = getBooksWithFinished(value === '1');
      break;
    case 'name':
      books = getBooksWithName(value);
      break;
  }

  response.statusCode = 200;
  response.end(
    JSON.stringify({
      status: 'success',
      data: { books },
    })
  );
};
