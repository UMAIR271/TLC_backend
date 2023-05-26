import { Router } from 'express';
import { addProduct, getProductByCollectionId, getProductById } from '../controllers/product.collection.js'
import {  isLoggedIn, authorize } from "../middlewares/auth.middleware.js";
import AuthRoles from "../utils/authRole.js";


const router = Router()

router.post("/", isLoggedIn, authorize(AuthRoles.USER), addProduct)
router.get("/:id", isLoggedIn, authorize(AuthRoles.USER), getProductById)
router.get("/get-by-collection/:id", isLoggedIn, authorize(AuthRoles.USER), getProductByCollectionId)

export default router