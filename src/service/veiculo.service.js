import { ApiError } from "../customError/api.error.js";
import { VeiculoRepository } from "../repository/veiculo.repository.js";

const veiculoRepository = new VeiculoRepository
export class VeiculoService {
    async create(veiculo) {
        if (Object.keys(veiculo).length !== 6) {
            throw new ApiError("Por favor, preencha todos os campos.", 400)
        }
        const novoVeiculo = await veiculoRepository.saveVeiculo(veiculoRepository.createVeiculo(veiculo));
        return novoVeiculo;
    }

    async list() {
        const veiculos = await veiculoRepository.getVeiculos()
        if (veiculos.length === 0) {
            throw new ApiError("Lista vazia.", 404)
        }
        return veiculos
    }

    async listOne(veiculoID) {
        const veiculo = await veiculoRepository.getVeiculo(veiculoID);
        if (!veiculo) {
            throw new ApiError("Veiculo não encontrado.", 404)
        }
        return veiculo;

    }

    async update(veiculo, veiculoID) {
        if (Object.keys(veiculo).length !== 6) {
            throw new ApiError("Por favor, preencha todos os campos.", 400)
        }
        const veiculoEncontrado = await veiculoRepository.getVeiculo(veiculoID);
        if (!veiculoEncontrado) {
            throw new ApiError("Veiculo não encontrado.", 404)
        }
        const novoVeiculo = veiculoRepository.createVeiculo(veiculo);
        veiculoRepository.updateVeiculo(novoVeiculo, veiculoID);
        return novoVeiculo;
    }

    async delete(veiculoID) {
        const veiculoEncontrado = await veiculoRepository.getVeiculo(veiculoID);
        if (!veiculoEncontrado) {
            throw new ApiError("Veiculo não encontrado.", 404)
        }
        veiculoRepository.deleteVeiculo(veiculoID);
        const message = "Veiculo deletado."
        return message;
    }
}