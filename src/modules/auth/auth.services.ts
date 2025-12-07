import bcrypt from 'bcrypt'
import { pool } from '../../config/config.db';
import jwt from 'jsonwebtoken'
import constants from '../../config/config.env';

const createUserQuery = async (payload: Record<string, undefined>) => {
    const { name, email, password, phone, role } = payload;
    if (password && (password as string).length < 6) {
        return;
    }
    const encodePass = await bcrypt.hash(password!, 10);
    
    const res = await pool.query(`
            INSERT INTO users ( name, email, password, phone, role) 
                VALUES ($1, $2, $3, $4, $5) RETURNING *
        `, [name, email, encodePass, phone, role])
    
    return res;
}

const signinUserQuery = async (email: string, password: string) => {
    const res = await pool.query(`
            SELECT * FROM users WHERE email = $1
        `, [email])
    
    const user = res.rows[0]

    if (user) {
        const matchPass = await bcrypt.compare(password, user.password)
        if (matchPass) {

            const token = jwt.sign({id: user.id, name: user.name, email: user.email, role: user.role, }, constants.secret!, {expiresIn: "7d"})

            const { password, ...userData } = user;

            return { token, user: userData };
        } else {
            return {message: "Password don't match!", user};
        }
    } else {
        return {message: "No users registered with this email" }
    }
}

export const authServices = {
    createUserQuery,
    signinUserQuery
}