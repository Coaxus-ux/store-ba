import express from "express";
import {
    addProduct, getProducts, deleteProduct, updateProduct
} from "../controllers/productController.js";
const router = express.Router();
router.post("/add", addProduct);
router.post("/get", getProducts);
router.delete("/delete", deleteProduct);
router.put("/update", updateProduct);
export default router;