const Category = require("../models/blogCategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

// Create Category
const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
});

// Update Category
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCategory);
  } catch (error) {
    throw new Error(error);
  }
});

// Delete Category
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.json({
      message: "Category Deleted Successfully",
      deletedCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get Category
const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const category = await Category.findById(id);
    res.json(category);
  } catch (error) {
    throw new Error(error);
  }
});

// Get All Categories
const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategories,
};
