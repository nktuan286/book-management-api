const Category = require('../models/category');

exports.add = async ({ name }) => {
  const category = await Category.findOne({
    name
  });

  if (category) {
    throw new Error('Category already exists!');
  }

  const newCategory = new Category({
    name
  });

  try {
    newCategory.save();
  } catch (error) {
    throw new Error(error.message);
  }

  return name;
}

exports.getAll = async () => {
  return await Category.find({
    deletedAt: null
  });
}
