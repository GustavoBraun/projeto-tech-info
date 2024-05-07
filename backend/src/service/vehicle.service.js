import { ApiError } from "../custom-error/api.error.js";
import { VehicleRepository } from "../repository/vehicle.repository.js";

const vehicleRepository = new VehicleRepository
export class VehicleService {
    async create(vehicle) {
        if (Object.keys(vehicle).length !== 6) {
            throw new ApiError("Por favor, preencha todos os campos.", 400)
        }
        const newVehicle = await vehicleRepository.saveVehicle(vehicleRepository.createVehicle(vehicle));
        return newVehicle;
    }

    async findAll() {
        const vehicles = await vehicleRepository.getVehicles()
        if (vehicles.length === 0) {
            throw new ApiError("Lista vazia.", 404)
        }
        return vehicles
    }

    async findById(vehicleID) {
        const vehicle = await vehicleRepository.getVehicle(vehicleID);
        if (!vehicle) {
            throw new ApiError("Veiculo não encontrado.", 404)
        }
        return vehicle;

    }

    async update(vehicle, vehicleID) {
        if (Object.keys(vehicle).length !== 6) {
            throw new ApiError("Por favor, preencha todos os campos.", 400)
        }
        const vehicleFound = await vehicleRepository.getVehicle(vehicleID);
        if (!vehicleFound) {
            throw new ApiError("Veiculo não encontrado.", 404)
        }
        const updatedVehicle = vehicleRepository.createVehicle(vehicle);
        vehicleRepository.updateVehicle(updatedVehicle, vehicleID);
        return updatedVehicle;
    }

    async delete(vehicleID) {
        const vehicleFound = await vehicleRepository.getVehicle(vehicleID);
        if (!vehicleFound) {
            throw new ApiError("Veiculo não encontrado.", 404)
        }
        vehicleRepository.deleteVehicle(vehicleID);
        const message = "Veiculo deletado."
        return message;
    }
}