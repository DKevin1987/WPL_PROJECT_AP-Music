import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";



export function RouteSecureMiddleware(req: Request, res: Response, next: NextFunction) {
    const token: string | undefined = req.cookies?.jwt;

    if (!token) {
        console.log("No token found, redirecting to login");
        return res.redirect("/login"); 
    }
    
    jwt.verify(token, process.env.JWT_SECRET!, (err, email) => {
        if (err) {
            res.redirect("/login");
        } else {
            res.locals.user_email = email;
            next();
        }
    });
};


export function ApiSecureMiddleware(req: Request, res: Response, next: NextFunction) {
    const token: string | undefined = req.cookies?.jwt;

    console.log("hit api secure");
    
    if (!token) {
        console.log("No token found, redirecting to login");
        return res.status(403).send(); 
    }
    
    jwt.verify(token, process.env.JWT_SECRET!, (err, email) => {
        if (err) {
            return res.status(403).send()
        } else {
            res.locals.user_email = email;
            next();
        }
    });
};



export function restrict_when_logged_in(req: Request, res: Response, next: NextFunction) {
    const token: string | undefined = req.cookies?.jwt;

    if (!token) {
        next()
        return
    }
    
    jwt.verify(token, process.env.JWT_SECRET!, (err, email) => {
        if (err) {
            next();
        } else {
            res.locals.user_email = email;
            res.redirect("/homepage");
        }
    });
};

