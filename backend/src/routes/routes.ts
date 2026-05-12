import express, {Request, Response} from "express"
import { createUser, loginUser, getProfile } from "../userControllers/controllers"
import { authMiddleware } from "../middlewares/authMiddleware"

const router = express.Router()

router.post("/signup", createUser)

router.post("/signin", loginUser)

router.get("/profile", authMiddleware, getProfile)

export default router