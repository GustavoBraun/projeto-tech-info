import { VehicleService } from "../service/vehicle.service.js";
const vehicleService = new  VehicleService

export class VehicleController {
    async create (req, res, next) {
        try {
            const vehicle = req.body;
            const newVehicle = await vehicleService.create(vehicle);
            return res.status(201).send({newVehicle: newVehicle});
        } catch (error) {
            next(error)
        }
    }
    async list (req, res, next) {
        try {
            const vehicles = await vehicleService.list();
            return res.send(vehicles)
        } catch (error) {
            next(error);
        }
    }
    async listOne(req, res, next) {
        try {       
            const vehicleID = parseInt(req.params.id);
            const vehicle = await vehicleService.listOne(vehicleID);
            return res.send(vehicle);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const vehicleID = parseInt(req.params.id);
            const vehicle = req.body;
            const newVehicle = await vehicleService.update(vehicle, vehicleID);
            return res.status(200).send(newVehicle);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const vehicleID = parseInt(req.params.id);
            const message = await vehicleService.delete(vehicleID);
            return res.send({message: message});
        } catch (error) {
            next(error);
        }
    }
}