import express, {Request, Response} from "express"
import { createUser, loginUser } from "../userControllers/controllers"
// import { authMiddleware } from "../middlewares/authMiddleware"

const router = express.Router()

router.get('/', (req:Request, res: Response)=>{
    res.json({Greeting: "Hello World"})
})

router.post("/register", createUser)

router.post("/login", loginUser)

export default router