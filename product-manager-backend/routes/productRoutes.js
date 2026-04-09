import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

import { verifyToken, checkRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET ALL (public or protected — your choice)
router.get("/", getProducts);

// GET ONE
router.get("/:id", getProductById);

// CREATE (admin + manager)
router.post(
  "/",
  verifyToken,
  checkRole(["admin", "manager"]),
  createProduct
);

// UPDATE (admin + manager)
router.put(
  "/:id",
  verifyToken,
  checkRole(["admin", "manager"]),
  updateProduct
);

// DELETE (admin only)
router.delete(
  "/:id",
  verifyToken,
  checkRole(["admin"]),
  deleteProduct
);

export default router;