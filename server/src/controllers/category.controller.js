const asyncHandler = require("express-async-handler");
const Categories = require("../model/category.model");

/**
 * @Desc    Add category
 * @Route   POST /api/v1/categories
 * @Access  Private
 */
const addCategory = asyncHandler(async function (req, res) {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error("fill all required fields");
  }

  const checkTitle = await Categories.findOne({ title });

  if (checkTitle) {
    res.status(400);
    throw new Error("title already created");
  }

  const newCategory = await Categories.create({
    title,
    description,
  });

  if (newCategory) {
    res.status(201).json({
      category: newCategory,
    });
  } else {
    res.status(400);
    throw new Error("could not create a new category");
  }
});

/**
 * @Desc    GET categories
 * @Route   Get /api/v1/categories
 * @Access  Private
 */
const getAllCategory = asyncHandler(async function (req, res) {
  try {
    const allCategories = await Categories.find();

    res.status(200).json({
      categories: allCategories,
    });
  } catch (error) {
    res.status(400);
    throw new Error("can not get all candidates");
  }
});

/**
 * @Desc    Get a category
 * @Route   GET /api/v1/categories/:id
 * @Access  Private
 */
const getCategory = asyncHandler(async function (req, res) {
  const { id } = req.params;

  try {
    const category = await Categories.findById(id);

    if (!category) {
      res.status(400);
      throw new Error("candidate not found");
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(400);
    throw new Error("can not get candidate");
  }
});

/**
 * @Desc    Update categories
 * @Route   PUT /api/v1/categories/:id
 * @Access  Private
 */
const updateCategory = asyncHandler(async function (req, res) {
  const { id } = req.params;

  const category = await Categories.findById(id);

  if (!category) {
    res.status(400);
    throw new Error("candidate not found");
  }

  try {
    await Categories.findByIdAndUpdate(id, req.body);
    const updatedCategories = await Categories.findById(id);
    res.status(200).json(updatedCategories);
  } catch (error) {
    res.status(400);
    throw new Error("can not get candidate");
  }
});

/**
 * @Desc    Remove categories
 * @Route   DELETE /api/v1/categories/:id
 * @Access  Private
 */
const deleteCategory = asyncHandler(async function (req, res) {
  const { id } = req.params;

  const category = await Categories.findById(id);

  if (!category) {
    res.status(400);
    throw new Error("categories not found");
  }

  try {
    await Categories.findByIdAndDelete(id, req.body);
    res.sendStatus(204);
  } catch (error) {
    res.status(400);
    throw new Error("can not delete categories");
  }
});

module.exports = {
  addCategory,
  getAllCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
