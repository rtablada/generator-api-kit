var Mystique = require('mystique');

var BookTransformer = Mystique.Transformer.extend({
  resourceName: 'book',
  mapOut: function(book) {
    return {
      id: book.id,
      title: book.title,
      year: book.year,
      isbn: book.data.isbn,
      author: book.author._id,
    };
  },

  mapIn(req) {
    return {
      title: req.body.book.title,
      year: req.body.book.year,
      data: {
        isbn: req.body.book.isbn,
      },
    };
  },
});

Mystique.registerTransformer('Book', BookTransformer);
