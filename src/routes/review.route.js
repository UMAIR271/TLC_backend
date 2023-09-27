import { Router } from "express";
import {
  addReview,
  productReview,
  userReview,
} from "../controllers/review.controller.js";
import { isLoggedIn } from "./../middlewares/auth.middleware.js";

const router = Router();

router.get("/:id", productReview);
router.post("/", isLoggedIn, addReview);
router.get("/:id", isLoggedIn, userReview);

export default router;
