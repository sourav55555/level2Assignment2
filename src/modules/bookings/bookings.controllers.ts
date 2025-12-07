import { Request, Response } from "express";
import { bookingService } from "./bookings.services";
import { JwtPayload } from "jsonwebtoken";


const createBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingService.createBookingQuery(req.body);
       
            if (result.res) {
                res.status(201).json({
                    success: true,
                    message: "Booking created successfully",
                    data: result.res
                })
            } else if (result.message) {
                 res.status(404).json({
                    success: false,
                    message: result.message,
                    
                })
            }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
   
}

const getAllBookings = async (req: Request, res: Response) => {
    try { 
        const result = await bookingService.getBookingsList(req.user as JwtPayload);
        if (result.rows.length > 0) {
            res.status(200).json({
                success: true,
                message: req.user?.role === "customer" ? "Your bookings retrieved successfully" : "Bookings retrieved successfully",
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

const updateBooking = async (req: Request, res: Response) => {
    try {

        const { bookingId } = req.params;
        const result = await bookingService.updateBooking(bookingId, req.user || {}, req.body);

        if (result) {
            res.status(200).json({
                success: true,
                message: req.user?.role === "customer" ? "Booking cancelled successfully" : "Booking marked as returned. Vehicle is now available",
                data: result
            })
        } 
    } catch (err: any) {
            res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}



export const bookingControllers = {
    createBooking,
    getAllBookings,
    updateBooking,

}