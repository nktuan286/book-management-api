const express = require('express');
const {
  login,
  signup
} = require('../controllers/authController');
const {
  getBooks,
  addBook,
  getBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController');
const {
  addCategory,
  getCategories
} = require('../controllers/categoryController');
const authCheck = require('../middleware/auth');

const router = express.Router();

// auth routes
router.post('/auth/login', login);
router.post('/auth/register', signup);
// book routes
router.get('/books', getBooks);
router.get('/books/:id', getBook);
router.post('/books', authCheck, addBook);
router.put('/books/:id', authCheck, updateBook);
router.delete('/books/:id', authCheck, deleteBook);
// category routes
router.post('/categories', authCheck, addCategory);
router.get('/categories', getCategories);

module.exports = router;
