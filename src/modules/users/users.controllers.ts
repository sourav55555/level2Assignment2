import {Request, Response } from "express";
import { userServices } from "./users.services";


const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userServices.allUserQuery();
        if (result.rows.length > 0) {
            res.status(200).json({
                success: true,
                message: "Users retrieved successfully",
                data: result.rows
            })
        } else {
               res.status(200).json({
                success: true,
                message: "No users found",
                data: []
            })
        }
    }catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        const { userId } = req.params;

        const result = await userServices.updateUserQuery(req.user, userId, payload);
        if (result.message) {
              res.status(401).json({
                success: false,
                message: "Unauthorized access",
             
            })
        }
  
        if (result.res?.rowCount && result.res.rowCount > 0) {
             res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: result.res.rows[0]
            })
        }
    }catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }

}

const deleteUser = async (req: Request, res: Response) => { 
    try {
        
        const { userId } = req.params;
        const result = await userServices.deleteUser(userId);

        if (result.rows[0]?.status && result.rows[0].status === "active") {
             res.status(400).json({
                    success: false,
                    message: "User have active booking"
                })
        }
        else if (result.rowCount && result.rowCount > 0) {
                res.status(200).json({
                    success: true,
                    message: "User deleted successfully"
                })
                
            }
        
    }catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

export const userController = {
    getAllUsers,
    updateUser,
    deleteUser
}