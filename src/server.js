const http = require('http');
const addbook = require('./addbook');
const getbooks = require('./getbooks');
const getBookById = require('./getbookById');
const editbook = require('./editbook');
const removeBookById = require('./removeBookById');
const getbooksWith = require('./getbooksWith');
/**
 * Logika untuk menangani dan menanggapi request dituliskan pada fungsi ini
 *
 * @param request: objek yang berisikan informasi terkait permintaan
 * @param response: objek yang digunakan untuk menanggapi permintaan
 */
const requestListener = (request, response) => {
  try {
    const { url, method } = request;

    // console.log('url: ', url);
    if (url === '/') {
      if (method === 'GET') {
        response.statusCode = 200;
        response.write('<html>');
        response.write('<body>');
        response.write('<h1>Hello, World!</h1>');
        response.write('</body>');
        response.write('</html>');
        response.end();
      } else {
        response.statusCode = 400;
        response.end(
          `<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`
        );
      }
    } else if (url === '/books') {
      response.setHeader('Content-Type', 'application/json; charset=utf-8');
      response.setHeader('X-Powered-By', 'NodeJS');

      const { method } = request;

      if (method === 'POST') {
        addbook(request, response);
      } else if (method === 'GET') {
        getbooks(request, response);
      } else {
        response.statusCode = 400;
        response.end(
          `<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`
        );
      }
    } else if (url.startsWith('/books/')) {
      response.setHeader('Content-Type', 'application/json; charset=utf-8');
      response.setHeader('X-Powered-By', 'NodeJS');

      const bookId = url.split('/')[2]; // Mendapatkan bookId dari URL

      if (method === 'GET') {
        getBookById(request, response, bookId);
      } else if (method === 'PUT') {
        editbook(request, response, bookId);
      } else if (method === 'DELETE') {
        removeBookById(request, response, bookId);
      } else {
        response.statusCode = 400;
        response.end(
          `<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`
        );
      }
    } else if (url.startsWith('/books?')) {
      response.setHeader('Content-Type', 'application/json; charset=utf-8');
      response.setHeader('X-Powered-By', 'NodeJS');

      const query = url.split('?')[1];
      const queryKey = query.split('=')[0]; // Mendapatkan bookId dari URL
      const queryValue = query.split('=')[1]; // Mendapatkan bookId dari URL

      getbooksWith(request, response, queryKey, queryValue);
      if (method === 'GET') {
      } else {
        response.statusCode = 400;
        response.end(
          `<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`
        );
      }
    } else {
      response.setHeader('Content-Type', 'application/json; charset=utf-8');
      response.statusCode = 404;
      // TODO 1: logika respons bila url bukan '/' atau '/about'
      response.end('<h1>Halaman tidak ditemukan!</h1>');
    }
  } catch (err) {
    console.log(err);
  }
};

const server = http.createServer(requestListener);

const port = 9000;
const host = 'localhost';

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
