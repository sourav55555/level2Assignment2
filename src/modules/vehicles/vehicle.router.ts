import { Router } from "express";
import { vehicleControllers } from "./vehicle.controllers";
import { authenticate } from "../../middleware/auth";



const router = Router()

router.post("/", authenticate("admin"), vehicleControllers.createVehicle)
router.get("/", vehicleControllers.getAllVehicles)
router.get("/:vehicleId", vehicleControllers.getVehicleData)

router.put("/:vehicleId", authenticate("admin"), vehicleControllers.updateVehicleData)
router.delete("/:vehicleId", authenticate("admin"), vehicleControllers.deleteVehicleData)
export default router