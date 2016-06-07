var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// create model book
var BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year:  { type: Number, required: true },
  pdf:   { type: String, required: false }
}, { timestamps: true } );

// Make model avail for use
module.exports = mongoose.model('Book', BookSchema);
