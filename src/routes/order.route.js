import { Router } from "express";
import {
  createOrder,
  placeOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
  sendOrderMail,
} from "../controllers/order.controller.js";
import { isLoggedIn, authorize } from "../middlewares/auth.middleware.js";
import AuthRoles from "../utils/authRole.js";

const router = Router();

router.post("/create-order", createOrder);
router.post("/place-order", placeOrder);
router.get("/", isLoggedIn, authorize(AuthRoles.ADMIN), getAllOrders);
router.get("/:id", isLoggedIn, getMyOrders);
router.patch("/:id", isLoggedIn, authorize(AuthRoles.ADMIN), updateOrderStatus);
router.post("/send-order-email", sendOrderMail);
export default router;
