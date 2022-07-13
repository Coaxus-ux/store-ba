import express from "express";
import {
    addCategory,
    getCategories,
    deleteCategory,
    updateCategory
} from "../controllers/categoryController.js";
const router = express.Router();
router.post("/add", addCategory);
router.post("/get", getCategories);
router.delete("/delete", deleteCategory);
router.put("/update", updateCategory);
export default router;