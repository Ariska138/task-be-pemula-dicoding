const { addBook } = require('../data');

module.exports = (request, response) => {
  let body = [];

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    body = Buffer.concat(body).toString();
    const {
      name,
      year,
      author,
      publisher,
      summary,
      pageCount,
      readPage,
      reading,
    } = JSON.parse(body);

    if (
      !name ||
      !year ||
      !author ||
      !publisher ||
      !summary ||
      !pageCount ||
      !readPage
    ) {
      let errorMessage = 'Gagal menambahkan buku. ';

      if (!name) {
        errorMessage += 'Mohon isi nama buku';
      } else if (!year) {
        errorMessage += 'Mohon isi tahun terbit';
      } else if (!author) {
        errorMessage += 'Mohon isi penulis buku';
      } else if (!publisher) {
        errorMessage += 'Mohon isi penerbit buku';
      } else if (!summary) {
        errorMessage += 'Mohon isi ringkasan buku';
      } else if (!pageCount) {
        errorMessage += 'Mohon isi jumlah halaman buku';
      } else if (!readPage) {
        errorMessage += 'Mohon isi jumlah halaman yang telah dibaca';
      }

      response.statusCode = 400;
      response.end(
        JSON.stringify({
          status: 'fail',
          message: errorMessage,
        })
      );
      return;
    }

    if (readPage > pageCount) {
      response.statusCode = 400;
      response.end(
        JSON.stringify({
          status: 'fail',
          message:
            'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        })
      );
      return;
    }

    const book = addBook({
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    });

    response.statusCode = 201;
    response.end(
      JSON.stringify({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: book,
      })
    );
  });
};
