const Book = require('../models/book');
const Category = require('../models/category');

/**
 * Get all books
 * @param page Page number
 * @param limit Limited how many books would be show
 * @param orderBy
 * @param sortBy Define which field is ordered
 * @returns Return an array of books
 */
exports.getAll = async ({ page = 1, limit = 100, orderBy = 'asc', sortBy = "createdAt" }) => {
  const skip = (page - 1) * limit;

  const books = await Book.find({
    deletedAt: null
  })
  .sort({ [sortBy]: orderBy })
  .skip(skip)
  .limit(limit)
  .populate('category');

  const booksWithDiscountedPrice = books.map(book => ({
    ...book._doc, // spread existing book data
    discountedPrice: book.getDiscountedPrice() // calculate discounted price
  }));

  return booksWithDiscountedPrice;
}

/**
 * Get a specific book by ID
 * @param id Book ID
 * @returns Return an object of book
 */
exports.get = async ({ id }) => {
  const book = await Book.findOne({
    _id: id,
    deletedAt: null
  }).populate('category');

  if (!book) {
    throw new Error('Book not found');
  }

  const result = {
    ...book?._doc, // spread existing book data
    discountedPrice: book.getDiscountedPrice() // calculate discounted price
  };

  return result;
}

/**
 * Add a new book
 * @param title
 * @param isbn ISBN must be in the format XXX-XXXXXXXXXX
 * @param price
 * @param author
 * @param category
 * @param review
 * @param discount
 * @returns Return an object of created book
 */
exports.add = async ({ title, isbn, price, author, category, review, discount = null }) => {
  const categoryId = await Category.findOne({
    _id: category,
  });

  if (!categoryId) {
    throw new Error('Category not found!');
  }

  const newBook = new Book({
    title,
    isbn,
    price,
    author,
    category: categoryId,
    review,
    discount,
  });

  try {
    await newBook.save();
  } catch (error) {
    throw new Error(error.message);
  }

  return newBook;
}

/**
 * Update a book by ID
 * @param title
 * @param price
 * @param author
 * @param category
 * @param review
 * @param discount
 * @returns Return an object of updated book
 */
exports.update = async ({ id, data }) => {
  const { title, price, author, category, review, discount } = data;

  const categoryId = await Category.findOne({
    _id: category,
  });

  if (!categoryId) {
    throw new Error('Category not found!');
  }

  const updatedBook = await Book.findOneAndUpdate(
    {
      _id: id,
      deletedAt: null
    },
    {
      title, price, author, category: categoryId, review, discount
    },
    { new: true }
  );

  if (!updatedBook) {
    throw new Error('Book not found!');
  }

  return updatedBook;
}

/**
 * Delete a book by ID
 * @param id Book ID
 * @returns Return an object of deleted book
 */
exports.delete = async ({ id }) => {
  const book = await Book.findOneAndUpdate({
    _id: id,
    deletedAt: null
  }, {
    deletedAt: new Date()
  }, { new: true });

  if (!book) {
    throw new Error('Book not found!');
  }

  return book;
};
