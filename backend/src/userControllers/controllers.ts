import { Request, Response, NextFunction } from "express";
import { pool } from "../database/database";
import { AppError } from "../errors/AppError";
import { uuidv7 } from 'uuidv7';
import bcrypt from 'bcrypt'
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { generateToken } from "../utils/jwt";

interface User extends RowDataPacket{
    id: string, 
    fullName: string,
    email: string,
    password: string
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function createUser(req: Request, res: Response, next: NextFunction){

    try {
        const {fullName, email, password } = req.body

        if (!fullName || !email || !password) throw new AppError('All fields are required', 400);

        if(!emailRegex.test(email)) throw new AppError('Invalid email format', 400)

        if(password.length < 8) throw new AppError('Password must be at least 8 characters', 400)

        const noSpacesFullName = fullName.trim()

        const [users] = await pool.query<User[]>('SELECT id FROM users WHERE email = ?', [email])

        if(users.length > 0) throw new AppError('Email already in use', 409)

        const id = uuidv7(); 
        const hashedPassword = await bcrypt.hash(password, 10)

        const [newUser] = await pool.query<ResultSetHeader>("INSERT INTO users (id, fullName, email, password) VALUES (?, ?, ?, ?)",[id, noSpacesFullName, email, hashedPassword] )

        if(newUser.affectedRows > 0) return res.status(201).json({message: "Successfully registered"})
        
    } catch (error) {
        next(error)
    }
}

export async function loginUser(req: Request, res: Response, next: NextFunction){

    try {
        const {email, password} = req.body

        if(!email || !password ) throw new AppError('All fields are required', 400)

        const [users] = await pool.query<User[]>("SELECT id, password FROM users WHERE email = ?", [email])

        if(users.length === 0) throw new AppError('Invalid credentials', 401)

        const user = users[0]

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) throw new AppError('Invalid credentials', 401)
        
        const token = generateToken(user.id)

        return res.status(200).json({message: "Logged in successfully", token})

    } catch (error) {
        next(error)
    }

}

export async function getProfile(req: Request, res: Response, next: NextFunction){
    try {
        const userId: string | undefined = req.userId

        const [users] = await pool.query<User[]>("SELECT id, fullName, email FROM users WHERE id = ?", [userId])

        if(users.length === 0) throw new AppError("User not found", 404)

        const user = users[0]

        return res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}