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
  return req.store.recordItemById('Book', req.params.id, {include: ['author']});
};

// POST
api.addBook = function(req) {
  return req.store.createRecord('Book', {
    beforeSave: (book, save) => {
      book.author = req.user;
      save();
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
router.post('/books', api.addBook);

router.route('/books/:id')
  .get(api.book)
  .put(api.editBook)
  .delete(api.deleteBook);

module.exports = router;
