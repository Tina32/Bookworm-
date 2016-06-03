var express = require('express');
var router = express.Router();

var Book = require('../models/book');

function seedBooks() {
 var books = [
   { title: 'MEAN Machine', year: 2016 },
   { title: 'The Clean Coder', year: 2015 },
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
router.get('/', function(req, res, next) {
  Book.find({})
  .then(function(books) {
  res.json(books);
  });
});


// SHOW Route
router.get('/:id', function(req, res, next) {
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
});

module.exports = router;
