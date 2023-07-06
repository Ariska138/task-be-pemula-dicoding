const { updateBook, getBookById } = require('../data');

module.exports = (request, response, bookId) => {
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
      let errorMessage = 'Gagal memperbarui buku. ';

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
            'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        })
      );
      return;
    }

    let oldbook = getBookById(bookId);

    if (!oldbook || Object.keys(oldbook).length === 0) {
      response.statusCode = 404;
      response.end(
        JSON.stringify({
          status: 'fail',
          message: 'Gagal memperbarui buku. Id tidak ditemukan',
        })
      );
      return;
    }

    const book = updateBook(bookId, {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    });

    response.statusCode = 200;
    response.end(
      JSON.stringify({
        status: 'success',
        message: 'Buku berhasil diperbarui',
        data: book,
      })
    );
  });
};
