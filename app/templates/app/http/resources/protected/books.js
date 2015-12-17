// Module dependencies.
var express = require('express');
var router = express.Router();
var api = {};

// ALL
api.books = function(req) {
  return req.store.recordCollection('Book', {
    include: ['author'],
    queryBy: ['year'],
    orderBy: 'year',
  });
};

// GET
api.book = function(req) {
  return req.store.recordItemById('Book', req.params.id);
};

// POST
api.addBook = function(req) {
  return req.store.createRecord('Book', {
    include: ['author'],
    beforeSave: (book, save) => {
      book.author = req.user;
      save();
    },

    afterSave: (book) => {
      var author = book.author;

      author.books.push(book);
      author.save();
    },
  });
};

// PUT
api.editBook = function(req) {
  return req.store.updateRecord('Book', req.params.id, {include: ['author']});
};

// DELETE
api.deleteBook = function(req) {
  return req.store.destroyRecord('Book', req.params.id);
};

router.get('/books', api.books);
router.post('/book', api.addBook);

router.route('/book/:id')
  .get(api.book)
  .put(api.editBook)
  .delete(api.deleteBook);

module.exports = router;
