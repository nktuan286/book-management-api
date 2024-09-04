const { validationResult } = require('express-validator');
const categoryService = require('../services/categoryService');

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body || {};
    const category = await categoryService.add({ name });

    res.status(200).json(category);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
}

exports.getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAll();

    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
}
