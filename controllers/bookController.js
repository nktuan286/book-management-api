const { validationResult } = require('express-validator');
const bookService = require('../services/bookService');

exports.getBooks = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const { page, limit } = req.query || {};

  try {
    const books = await bookService.getAll({
      page,
      limit
    });

    res.status(200).json(books);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
}

exports.getBook = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  try {
    const book = await bookService.get({ id: req.params?.id });

    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
}

exports.addBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const { title, isbn, price, author, category, review } = req.body || {};

  try {
    const book = await bookService.add({
      title, isbn, price, author, category, review
    });

    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
}

exports.updateBook = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  
  const { title, price, author, category, review, discount } = req.body || {};

  try {
    const book = await bookService.update({
      id: req.params?.id,
      data: {
       title, price, author, category, review, discount
      }
    });

    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
}

exports.deleteBook = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  try {
    const book = await bookService.delete({
      id: req.params?.id
    });

    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
}
