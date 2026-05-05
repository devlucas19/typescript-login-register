import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export function errorHandler(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Erro esperado (lançado por você)
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }

    // Erro inesperado
    console.error(error);
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
}