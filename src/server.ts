import express, { Request, Response } from 'express';
import constants from './config/config.env';
import initDB from './config/config.db'
import vehiclesRouter from './modules/vehicles/vehicle.router'
import usersRouter from './modules/users/users.routes'
import authRouter from './modules/auth/auth.routes'
import bookingRouter from './modules/bookings/bookings.router'

const app = express();

app.use(express.json());

initDB()

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/vehicles", vehiclesRouter)
app.use("/api/v1/users", usersRouter)
app.use("/api/v1/bookings", bookingRouter)


app.use("", (req: Request, res: Response) => {
    res.status(404).json({
        message: "No routes found"
    })
})

app.listen(constants.port, () => {
    console.log(`Server listening at ${constants.port}`)
})