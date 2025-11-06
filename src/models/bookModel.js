import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author', 
    required: true,
  },
  isbn: {
    type: String,
    trim: true,
    unique: true,
  },
  publishedDate: {
    type: Date,
  },
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
export default Book;