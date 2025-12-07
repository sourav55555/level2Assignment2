import { pool } from "../../config/config.db"

const createVehicleData = async (payload: Record<string, undefined>) => {
    const {vehicle_name, type, registration_number,daily_rent_price, availability_status} = payload
    const res = await pool.query(`
            INSERT INTO vehicles 
                (vehicle_name, type, registration_number,daily_rent_price, availability_status) 
                VALUES($1, $2, $3, $4, $5) RETURNING *
        `, [vehicle_name, type, registration_number, daily_rent_price, availability_status])
    return res
}

const getVehicleList = async () => {
    const res = await pool.query(`
            SELECT * FROM vehicles
        `)
    return res
}

const getVehicle = async (vehicleId: string) => {
    const res = await pool.query(`
            SELECT * FROM vehicles WHERE id = $1
        `, [vehicleId])
    
    return res
}

const updateVehicle = async (id: string, payload: Record<string, undefined>) => {
   
    const keys = Object.keys(payload)
    const values = Object.values(payload);
    const queryValues = keys.map((key, index) => `${key} = $${index + 1}`).join(",")

    const res = await pool.query(`
            UPDATE vehicles SET ${queryValues} WHERE id = $${values.length+1} RETURNING *
        `, [...values, id])
    
    return res
}

const deleteVehicle = async (id: string) => {
    const res = await pool.query(`
            DELETE FROM vehicles WHERE id = $1 AND availability_status != $2 RETURNING *
        `, [id, 'booked'])

    return res
}

export const vehiclesService = {
    createVehicleData,
    getVehicleList,
    getVehicle,
    updateVehicle,
    deleteVehicle
}