import {Request, Response } from "express";
import { authServices } from "./auth.services";

const createUser = async (req: Request, res: Response) => {

    try {
        
        const payload = req.body;
        const result = await authServices.createUserQuery(payload);

        if (result && result.rows.length > 0) {
            const { password, ...userData } = result.rows[0]
            res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: userData
            })
        } else {
            res.status(500).json({
            success: false,
            message: "User registration failed!",
        });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
  }

}

const signinUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const result = await authServices.signinUserQuery(email, password);
  
        if (result.message) {
            res.status(404).json({
                success: false,
                message: result.message
            })
        }
        if (result.token) {
            res.status(200).json({
                success: true,
                message: "Login successful",
                data: result
            })
        }
    }catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }

}

export const authController = {
    createUser,
    signinUser
}