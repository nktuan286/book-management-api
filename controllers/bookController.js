const { validationResult } = require('express-validator');
const bookService = require('../services/bookService');

exports.getBooks = async (req, res) => {
  try {
    const { page, limit } = req.query || {};
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
  try {
    const { title, isbn, price, author, category, review, discount } = req.body || {};

    const book = await bookService.add({
      title, isbn, price, author, category, review, discount
    });

    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
}

exports.updateBook = async (req, res) => {
  try {
    const { title, price, author, category, review, discount } = req.body || {};

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
