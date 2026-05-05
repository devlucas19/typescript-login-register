import { Request, Response, NextFunction } from "express";
import { pool } from "../database/database";
import { AppError } from "../errors/AppError";
import { uuidv7 } from 'uuidv7';
import bcrypt from 'bcrypt'


export async function createUser(req: Request, res: Response, next: NextFunction){

    try {
        const {fullName, email, password } = req.body

        if (!fullName || !email || !password) {
            throw new AppError('All fields are required', 400);
        }

        const [existentRows]: any = await pool.query('SELECT id FROM users WHERE email = ?', [email])

        if(existentRows.length > 0){
            throw new AppError('Email already in use', 409)
        }

        const id = uuidv7(); 
        const hashedPassword = await bcrypt.hash(password,10)

        const query = "INSERT INTO users (id, fullName, email, password) VALUES (?, ?, ?, ?)"

        const [result] = await pool.query(query, [id, fullName, email, hashedPassword])
        if(result) return res.status(201).json({message: "Successfully registered"})
    } catch (error) {
        next(error)
    }
}