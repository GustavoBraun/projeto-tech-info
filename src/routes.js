import Router from "express";
import { VeiculoRepository } from "./repository/veiculo.repository.js";
import { VeiculoController } from "./controller/veiculo.controller.js";

const router = Router();
const veiculoController = new VeiculoController;
router.get("/", (req, res) => {
    res.send("Olá.")
});

router.get("/veiculo", veiculoController.list);
router.get("/veiculo/:id", veiculoController.listOne);
router.post("/veiculo", veiculoController.create);
router.put("/veiculo/:id", veiculoController.update);
router.delete("/veiculo/:id", veiculoController.delete);

export default router