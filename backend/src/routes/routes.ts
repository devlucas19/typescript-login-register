import express, {Request, Response} from "express"
import { createUser, loginUser, getProfile, changeEmail } from "../userControllers/controllers"
import { authMiddleware } from "../middlewares/authMiddleware"
import { authLimit } from "../middlewares/rateLimitMiddleware"

const router = express.Router()

router.post("/signup", authLimit, createUser)

router.post("/signin", authLimit, loginUser)

router.get("/profile", authMiddleware, getProfile)

router.post("/changeEmail", authMiddleware, changeEmail)

export default router