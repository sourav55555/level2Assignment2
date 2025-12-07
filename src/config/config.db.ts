import {Pool} from 'pg'
import constants from './config.env'

export const pool = new Pool({
    connectionString: constants.connectionString
})

const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Users(
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                email VARCHAR(100)  CHECK (email = LOWER(email)) UNIQUE NOT NULL,
                password VARCHAR(225) NOT NULL CHECK (LENGTH(password) >= 6),
                phone VARCHAR(20) NOT NULL,
                role VARCHAR(80) NOT NULL CHECK ( role IN ('admin', 'customer') )
            )
        `)
    
        await pool.query(`
        CREATE TABLE IF NOT EXISTS Vehicles (
            id SERIAL PRIMARY KEY,
            vehicle_name VARCHAR(100) NOT NULL,
            type VARCHAR(50) CHECK(type IN ('car', 'bike', 'van', 'SUV')),
            registration_number VARCHAR(100) UNIQUE NOT NULL,
            daily_rent_price INT NOT NULL CHECK ( daily_rent_price > 0 ),
            availability_status VARCHAR(20) CHECK(availability_status IN ('available', 'booked'))
        );
        `)
    
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Bookings(
                id SERIAL PRIMARY KEY,
                customer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                vehicle_id INT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
                rent_start_date DATE NOT NULL,
                rent_end_date DATE NOT NULL CHECK ( rent_end_date > rent_start_date ),
                total_price INT NOT NULL CHECK ( total_price > 0 ),
                status VARCHAR(50) CHECK(status IN('active', 'cancelled', 'returned')) DEFAULT 'active'

            )
        `)
    }
    catch (err) {
        console.log(err,"error")
    }
}

export default initDB