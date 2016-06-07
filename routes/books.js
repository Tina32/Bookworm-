var express = require('express');
var router = express.Router();
var Book = require('../models/book');

function authenticate(req, res, next) {
  if(!req.isAuthenticated()) {
    res.json('/');
  }
  else {
    next();
  }
}

function seedBooks() {
 var books = [
   { title: 'MEAN Machine', year: 2016 , pdf: ""},
   { title: 'The Clean Coder', year: 2015 , pdf: ""}
 ];

 Book.find({}).remove()
 .then(function() {
   return Book.create(books);
 })
 .then(function() {
   return Book.find({});
 })
 .then(function(found) {
   console.log('We saved and retrieved', found.length, 'books.');
 });
}

seedBooks();



// Index Route
router.get('/getbooks', authenticate, function(req, res, next) {
  Book.find({})
  .then(function(books) {
  res.json(books);
  });
});

// NEW
router.get('/new', authenticate, function(req, res, next) {
    var item = {
        title: '',
        year: '',
        pdf: ''
    };
    res.json('items/new', { item: item });
});


// SHOW Route
router.get('/:id', authenticate, function(req, res, next) {
  Book.findById(req.params.id)
  .then(function(book) {
    if (!book) {
      res.status(404).json( { error: 'Not found' } );
    }
    res.json(book);
  })
  .catch(function(err) {
    return next(err);
  });

  // CREATE
router.post('/', authenticate, function(req, res, next) {
    var item = {
        title: req.body.title,
        year: req.body.year
    };
    currentUser.books.push(book);
    currentUser.save()
        .then(function() {
            res.json('/books');
        }, function(err) {
            return next(err);
        });
});

// EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
    var book = currentUser.books.id(req.params.id);
    if(!book) return next(makeError(res, 'Document not found', 404));
    res.json('books/edit', { book: book });
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
    var book = currentUser.books.id(req.params.id);
    if(!book) return next(makeError(res, 'Document not found', 404));
    else{
            book.title = req.body.titel;
            book.year = req.body.year;
            currentUser.save()
            .then(function(saved){
                res.json('/books');
            }, function(err){
                return next(err)
            });
    }
});

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
    var book = currentUser.books.id(req.params.id);
    if (!item) return next(makeError(res, 'Document not found', 404));
    var index = currentUser.books.indexOf(book);
    currentUser.items.splice(index, 1);
    currentUser.save()
        .then(function(saved) {
            res.json('/books');
        }, function(err) {
            return next(err);
        });
});

});

module.exports = router;
