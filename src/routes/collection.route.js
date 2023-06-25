import { Router } from 'express';
import { createCollection, deleteCollection, getAllCollections, updateCollection, getCollectionById } from "../controllers/collection.controller.js";
import {  isLoggedIn, authorize } from "../middlewares/auth.middleware.js";
import AuthRoles from "../utils/authRole.js";


const router = Router()

router.get('/:id', getCollectionById)
router.get("/", getAllCollections);
router.post("/", isLoggedIn, authorize(AuthRoles.ADMIN), createCollection)
router.put("/:id", isLoggedIn, authorize(AuthRoles.ADMIN), updateCollection)
router.delete("/:id", isLoggedIn, authorize(AuthRoles.ADMIN), deleteCollection)

export default router