// src/controllers/authorController.js
import Author from '../models/authorModel.js';

// POST /authors (Admin only)
export const createAuthor = async (req, res, next) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).json(author); // 201 Created
  } catch (error) {
    next(error);
  }
};

// GET /authors
export const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};

// GET /authors/:id
export const getAuthorById = async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ error: "Author not found" }); // 404 Not Found
    }
    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
};

// PUT /authors/:id (Admin only)
export const updateAuthor = async (req, res, next) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Retourne le document mis à jour
      runValidators: true,
    });
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
};

// DELETE /authors/:id (Admin only)
export const deleteAuthor = async (req, res, next) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.status(204).send(); // 204 No Content [cite: 27]
  } catch (error) {
    next(error);
  }
};