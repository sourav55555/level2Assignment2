import { Router } from "express";

import { authenticate } from "../../middleware/auth";
import { bookingControllers } from "./bookings.controllers";



const router = Router()

router.post("/", authenticate("admin", "customer"), bookingControllers.createBooking);
router.get("/", authenticate("admin", "customer"), bookingControllers.getAllBookings);
router.put("/:bookingId",authenticate("admin", "customer"), bookingControllers.updateBooking )

export default router;