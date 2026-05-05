import express, {Request, Response} from "express"
import { createUser } from "./userControllers/controllers"

const router = express.Router()

router.get('/', (req:Request, res: Response)=>{
    res.json({Greeting: "Hello World"})
})

router.post("/register", createUser)

export default router