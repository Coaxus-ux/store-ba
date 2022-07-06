import express from "express";
import {
    addCategory,
    getCategories,
    deleteCategory
} from "../controllers/categoryController.js";
const router = express.Router();
router.post("/add", addCategory);
router.post("/get", getCategories);
router.post("/delete", deleteCategory);
export default router;