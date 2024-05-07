import Router from "express";
import { VehicleController } from "./controller/vehicle.controller.js";

const router = Router();
const vehicleController = new VehicleController;
router.get("/", (req, res) => {
    res.send("Olá. Para ver a documentação da aplicação, vá até a rota http://localhost:8080/api-docs/")
});

router.get("/vehicle", vehicleController.list);
router.get("/vehicle/:id", vehicleController.listOne);
router.post("/vehicle", vehicleController.create);
router.put("/vehicle/:id", vehicleController.update);
router.delete("/vehicle/:id", vehicleController.delete);

export default router