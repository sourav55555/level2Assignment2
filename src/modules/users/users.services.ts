import bcrypt from 'bcrypt'
import { pool } from '../../config/config.db';
import jwt from 'jsonwebtoken'
import constants from '../../config/config.env';

const allUserQuery = async () => {
    const res = await pool.query(`
            SELECT id, name, email, phone, role FROM users
        `, )
    
    return res;
}


const updateUserQuery = async (user: any, id: string, payload: Record<string, undefined>) => {
    
    if (user.role === "customer") {
        const getCustomer = await pool.query(`
                SELECT * FROM users WHERE id = $1
            `, [id]);
        const checkUser = getCustomer.rows[0]

        if (getCustomer.rows[0]) {
            if (getCustomer.rows[0].email !== user.email) {
                return {
                    message: "Invalid user request"
                }
            }
        }
    }

    const keys = Object.keys(payload);
    const values = Object.values(payload);


    const updateString = keys.map((key, index) => `${key} = $${index + 1}`).join(" , ")


    const res = await pool.query(`
            UPDATE users SET ${updateString} WHERE id = $${keys.length + 1} RETURNING id, name, email,phone,role
        `, [...values, id])
    
    return { res };
}
const deleteUser = async (id: string) => {
    const checkActiveBook = await pool.query(`
            SELECT status FROM bookings WHERE customer_id = $1
        `, [id])

    if (checkActiveBook.rows.length === 0 || checkActiveBook.rows[0].status !== "active") {
        
        const res = await pool.query(`
                DELETE FROM users WHERE id = $1
            `, [id])
        
        return res
    } else {
        return checkActiveBook
    }
}

export const userServices = {
    allUserQuery,
    updateUserQuery,
    deleteUser
}