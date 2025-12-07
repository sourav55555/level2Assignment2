import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), ".env") });

const constants = {
    connectionString: process.env.CONNECTION_STRING,
    port: process.env.PORT,
    secret: process.env.SECRET
}
export default constants