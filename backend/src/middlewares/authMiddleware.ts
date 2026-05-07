import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
import { AppError } from "../errors/AppError"

interface TokenPayload{
    id: string, 
    iat: number,
    exp: number
}

export function authMiddleware(req: Request, res: Response, next: NextFunction){

    const {authorization} = req.headers

    if(!authorization) throw new AppError("Token not provided", 401)
    
    const [prefix, token] = authorization.split(" ")

    if(prefix !== "Bearer" || !token) throw new AppError("Invalid token format", 401)

    if(!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined")

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload
        req.userId = decoded.id
        next()
    }catch(error){
        next(error)
    }
}