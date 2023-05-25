import { Router } from "express";
import authRoutes from "./auth.route.js"
import collectionRoutes from "./collection.route.js"
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from '../../api.json' assert { type: "json" }

const router = Router()

router.use("/auth", authRoutes)
router.use("/collection", collectionRoutes)
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

export default router