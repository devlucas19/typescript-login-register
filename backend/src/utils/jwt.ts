import jwt from "jsonwebtoken" 
import { AppError } from "../errors/AppError"

export function generateToken(id: string): string{

    if(!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined")

    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    )
}
