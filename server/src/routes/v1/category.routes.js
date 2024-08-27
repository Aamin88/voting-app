const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/category.controller");

router
  .route("/")
  .post(categoryController.addCategory)
  .get(categoryController.getAllCategory);

router
  .route("/:id")
  .get(categoryController.getCategory)
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
