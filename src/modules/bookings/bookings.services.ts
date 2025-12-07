import { JwtPayload } from "jsonwebtoken"
import { pool } from "../../config/config.db"
import dayjs from "dayjs";
import { ppid } from "process";
import { response } from "express";

const createBookingQuery = async (payload: Record<string, undefined>) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
    const vehicle = await pool.query(`
            SELECT * FROM vehicles WHERE id = $1
        `, [vehicle_id])
    

    if (vehicle.rows[0].availability_status === "booked") {
        return {
            message: 'Vehicle is not available'
        }
    }
    let total_price = 0;
    if (vehicle.rows[0]) {
        const dayCount = dayjs(rent_end_date).diff(dayjs(rent_start_date), "day");
        total_price = dayCount * vehicle.rows[0].daily_rent_price
    }
    const res = await pool.query(`
            INSERT INTO bookings 
                (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price) 
                VALUES($1, $2, $3, $4, $5) RETURNING *
        `, [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price])
    await pool.query(`
         UPDATE vehicles SET availability_status = $1 WHERE id = $2
        `,["booked", vehicle_id])
    return {
        res: {
            ...res.rows[0],
            vehicle: {
                vehicle_name: vehicle.rows[0].vehicle_name,
                daily_rent_price: vehicle.rows[0].daily_rent_price
            }
    } }
}

const getBookingsList = async (user: JwtPayload) => {
    let res;
    if (user.role === "customer") { 
        res = await pool.query(`
                SELECT 
                    b.id, 
                    b.vehicle_id, 
                    TO_CHAR(b.rent_start_date, 'YYYY-MM-DD') AS rent_start_date,
                    TO_CHAR(b.rent_end_date, 'YYYY-MM-DD') AS rent_end_date, b.total_price, b.status,
                    json_build_object('vehicle_name', v.vehicle_name, 'registration_number', v.registration_number, 'type', v.type) AS vehicle
                FROM bookings as b
                LEFT JOIN vehicles as v
                ON b.vehicle_id = v.id
                WHERE b.customer_id = $1
            `,[user.id])
    } else {
        res = await pool.query(`
                SELECT 
                    b.id, 
                    b.customer_id,
                    b.vehicle_id, 
                    TO_CHAR(b.rent_start_date, 'YYYY-MM-DD') AS rent_start_date,
                    TO_CHAR(b.rent_end_date, 'YYYY-MM-DD') AS rent_end_date, b.total_price, b.status,
                    json_build_object('name', u.name, 'email', u.email) AS customer,
                    json_build_object('vehicle_name', v.vehicle_name, 'registration_number', v.registration_number) AS vehicle
                FROM bookings AS b
                LEFT JOIN vehicles as v
                ON b.vehicle_id = v.id
                LEFT JOIN users as u
                ON b.customer_id = u.id
            `)
    }

    // const {name, email, vehicle_name, registration_number, ...data } = res.rows
    return res
}

const updateBooking = async (bookingId: string, payload: Record<string, undefined>, body: Record<string, undefined>) => {
    const { status } = body;

    let res;

    
    if (payload.role === 'customer') {
        let vehicleId;
        const cBookData = await pool.query(`
                UPDATE bookings SET status = $1 WHERE rent_start_date > CURRENT_DATE  AND customer_id = $2 AND id = $3 RETURNING * 
            `, [status, payload.id, bookingId])

        vehicleId = cBookData.rows[0]?.vehicle_id
        let getBooking;
        if (!cBookData.rows[0]) { 
            getBooking = await pool.query(`
                SELECT * FROM bookings WHERE id = $1
            `, [bookingId])
            vehicleId = getBooking.rows[0]?.vehicle_id
            res = getBooking.rows[0]
        } else {
            res = cBookData.rows[0]
        }
        if (status === "cancelled") {
            await pool.query(`
            UPDATE vehicles SET availability_status = $1 WHERE id = $2 RETURNING availability_status
        `, ["available", vehicleId])
        }
       
    } else if(payload.role === 'admin') {
        const bookData = await pool.query(`
                UPDATE bookings SET status = $1 WHERE id = $2 RETURNING * 
            `, [status, bookingId])
        const vehicleId = bookData.rows[0].vehicle_id
        const vehicleStatus = await pool.query(`
            UPDATE vehicles SET availability_status = $1 WHERE id = $2 RETURNING availability_status
        `, ["available", vehicleId])

        res = {
            ...bookData.rows[0],
            vehicle: {
                availability_status: vehicleStatus.rows[0].availability_status
            }

        }
     
    }

     if (dayjs(res.rent_end_date) < dayjs()) {
        await pool.query(`
            UPDATE vehicles SET availability_status = $1 WHERE id = $2 RETURNING availability_status
            `, ["available", res.vehicle_id])
        const updateStatus = await pool.query(`
        UPDATE bookings SET status = $1 WHERE id = $2 RETURNING * 
         `, ["returned", bookingId])
        res = updateStatus.rows[0]
    }
   
    return res
}



export const bookingService = {
    createBookingQuery,
    getBookingsList,
    updateBooking
}