import { Request, Response } from "express";
import { vehiclesService } from "./vehicle.services";

const createVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehiclesService.createVehicleData(req.body);
            if (result.rows[0]) {
                res.status(201).json({
                    success: true,
                    message: "Vehicle created successfully",
                    data: result.rows[0]
                })
            } 
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
   
}

const getAllVehicles = async (req: Request, res: Response) => {
    try { 
        const result = await vehiclesService.getVehicleList();
        if (result.rows.length > 0) {
            res.status(200).json({
                success: true,
                message: "Vehicles retrieved successfully",
                data: result.rows
            })
        } else {
            res.status(200).json({
                success: true,
                message: "No vehicles found",
                data: result.rows
            })
        }
     }
    catch (err: any) {
            res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const getVehicleData = async (req: Request, res: Response) => {
    try {

        const { vehicleId } = req.params;
        const result = await vehiclesService.getVehicle(vehicleId);
        if (result.rows[0]) {
            res.status(200).json({
                success: true,
                message: "Vehicle retrieved successfully",
                data: result.rows[0]
            })
        } else {
             res.status(404).json({
                success: true,
                message: "No vehicle found",
          
            })
        }
    } catch (err: any) {
            res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const updateVehicleData = async (req: Request, res: Response) => {
    try { 
        const { vehicleId } = req.params
        const result = await vehiclesService.updateVehicle(vehicleId, req.body)
        if (result.rowCount && result.rowCount > 0) {
            res.status(200).json({
                success: true,
                message: "Vehicle updated successfully",
                data: result.rows[0]
            })
        }
    }catch (err: any) {
            res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const deleteVehicleData = async (req: Request, res: Response) => {
    try { 
        const {vehicleId} = req.params
        const result = await vehiclesService.deleteVehicle(vehicleId);
        if (result.rowCount && result.rowCount > 0) {
            res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully"
            })
            
        } else {
            res.status(200).json({
                success: false,
                message: "Vehicle is booked!"
            })
        }
            
    }catch (err: any) {
            res.status(500).json({
            success: false,
            message: err.message,
        });
    }

}

export const vehicleControllers = {
    createVehicle,
    getAllVehicles,
    getVehicleData,
    updateVehicleData,
    deleteVehicleData
}