const Category = require("../models/Category");

// get all categories controller
const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred",
    });
  }
};

// create new category controller
const createNewCategoryController = async (req, res) => {
  try {
    const { name } = req.body || {};

    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(200).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred",
    });
  }
};

// delete category controller
const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params || {};

    const deletedCategory = await Category.findByIdAndDelete(id);
    res.status(200).json(deletedCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred",
    });
  }
};

// update category controller
const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params || {};
    const { name } = req.body || {};

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        $set: { name },
      },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred",
    });
  }
};

module.exports = {
  getAllCategoriesController,
  createNewCategoryController,
  deleteCategoryController,
  updateCategoryController,
};
