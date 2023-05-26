import { Router } from 'express';
import { createCollection, deleteCollection, getAllCollections, updateCollection } from "../controllers/collection.controller.js";
import {  isLoggedIn, authorize } from "../middlewares/auth.middleware.js";
import AuthRoles from "../utils/authRole.js";


const router = Router()

router.post("/", isLoggedIn, authorize(AuthRoles.USER), createCollection)
router.put("/:id", isLoggedIn, authorize(AuthRoles.USER), updateCollection)
router.delete("/:id", isLoggedIn, authorize(AuthRoles.USER), deleteCollection)
router.get("/", isLoggedIn, authorize(AuthRoles.USER), getAllCollections);

export default router