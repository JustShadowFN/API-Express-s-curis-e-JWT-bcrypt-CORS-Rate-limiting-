import Book from '../models/bookModel.js';

export const createBook = async (req, res, next) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};


export const getAllBooks = async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page || 1)); 
    const limit = Math.min(100, Number(req.query.limit || 10)); 
    
    const offset = (page - 1) * limit; 


    const query = {};
    if (req.query.authorId) {
      query.author = req.query.authorId;
    }
    
    const sort = req.query.sort || 'title'; 

    const books = await Book.find(query)
      .populate('author', 'name') 
      .sort(sort)
      .skip(offset)
      .limit(limit); 
    
    const total = await Book.countDocuments(query);

    res.status(200).json({
      page,
      limit,
      total,
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate('author');
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};