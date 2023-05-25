import { Router } from "express";
import { getProfile, login, logout, signUp } from "../controllers/auth.controller.js";
import {  isLoggedIn , authorize } from "../middlewares/auth.middleware.js";
import AuthRole from "../utils/authRole.js";


const router = Router()

router.post("/signup", signUp)
router.post("/login", login)
router.get("/logout", logout)
router.get("/profile", isLoggedIn, authorize(AuthRole.USER), getProfile)


export default router;