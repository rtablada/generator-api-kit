var express = require('express');
var router = express.Router();

router.get('/', function(req) {
  return req.store.recordCollection('Book', {
    include: ['author'],
    queryBy: ['year'],
    orderBy: 'year',
  });
});

router.get('/:id', function(req) {
  return req.store.recordItemById('Book', req.params.id);
});

router.post('/', function(req) {
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
});

router.put('/:id', function(req) {
  return req.store.updateRecord('Book', {include: ['author']}, req.params.id);
});

router.delete('/:id', function(req) {
  return req.store.destroyRecord('Book', req.params.id);
});

module.exports = router;
