import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import constants from "../config/config.env";

export const authenticate = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { authorization } = req.headers;
        try {
            if (authorization) {
                const token = authorization.split(" ")[1];
           
                    const decoded = jwt.verify(
                        token!,
                        constants.secret as string
                    ) as JwtPayload;
    
                req.user = decoded;
                if (roles.length && roles.includes(decoded.role)) {
                    next()
                } else {
                    return res.status(403).json({
                        success: false,
                        message: "Forbidden!"
                    })
                }
            } else {
                return res.status(401).json({
                        success: false,
                        message: "Unauthorized Access!"
                    })
            }
        } catch (err) {
            console.log(err)
        }

    }
}

