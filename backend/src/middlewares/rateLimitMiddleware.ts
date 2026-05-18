import rateLimit from "express-rate-limit"

export const globalLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: {
        status: "error",
        message: "Too many requests, please try again later"
    }
})

export const authLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    message: {
        status: "error",
        message: "Too many attempts, please try again later"
    }
})