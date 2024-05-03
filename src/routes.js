import Router from "express";
import { VeiculoRepository } from "./repository/veiculoRepository.js";

const router = Router();
const veiculoRepository = new VeiculoRepository;
router.get("/", (req, res) => {
    res.send("Olá.")
});

router.get("/veiculo", veiculoRepository.getVeiculos);
router.get("/veiculo/:id", veiculoRepository.getVeiculo)
router.post("/veiculo", veiculoRepository.insertVeiculo);
router.put("/veiculo/:id", veiculoRepository.updateVeiculo);
router.delete("/veiculo/:id", veiculoRepository.deleteVeiculo);

export default router