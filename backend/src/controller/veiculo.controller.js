import { VeiculoService } from "../service/veiculo.service.js";
const veiculoService = new  VeiculoService

export class VeiculoController {
    async create (req, res, next) {
        try {
            const veiculo = req.body;
            const novoVeiculo = await veiculoService.create(veiculo);
            return res.status(201).send({novoVeiculo: novoVeiculo});
        } catch (error) {
            next(error)
        }
    }
    async list (req, res, next) {
        try {
            const veiculos = await veiculoService.list();
            return res.send(veiculos)
        } catch (error) {
            next(error);
        }
    }
    async listOne(req, res, next) {
        try {       
            const veiculoID = parseInt(req.params.id);
            const veiculo = await veiculoService.listOne(veiculoID);
            return res.send(veiculo);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const veiculoID = parseInt(req.params.id);
            const veiculo = req.body;
            const novoVeiculo = await veiculoService.update(veiculo, veiculoID);
            return res.status(200).send(novoVeiculo);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const veiculoID = parseInt(req.params.id);
            const message = await veiculoService.delete(veiculoID);
            return res.send({message: message});
        } catch (error) {
            next(error);
        }
    }
}