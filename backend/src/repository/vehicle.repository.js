import { db } from "../database/db.config.js";
import Vehicle from "../entity/vehicle.entity.js";

export class VehicleRepository {
    getVehicles() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM Vehicle",[], (err, rows) =>{
                if (err) {
                    reject(err)
                }
                resolve(rows)
            });
        })
    }

     getVehicle(id) {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM Vehicle WHERE id=?", [id], (err, rows) =>{
                if (err) {
                    reject(err)
                }
                resolve(rows)
            });
            
        })
    }

    createVehicle(obj) {
        const vehicle = new Vehicle(obj.placa, obj.chassi, obj.renavam, obj.modelo, obj.marca, obj.ano);
        return vehicle;
    }

     saveVehicle(vehicle) {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO Vehicle (placa, chassi, renavam, modelo, marca, ano) VALUES (?, ?, ?, ?, ?, ?)", [vehicle._placa, vehicle._chassi, vehicle._renavam, vehicle._modelo, vehicle._marca, vehicle._ano], function(err) {
                if (err) {
                    reject(err)
                };
                const newVehicle = {
                    _id : this.lastID,
                    _placa : vehicle._placa,
                    _chassi : vehicle._chassi,
                    _renavam : vehicle._renavam,
                    _modelo : vehicle._modelo,
                    _marca : vehicle._marca,
                    _ano : vehicle._ano
                }
                resolve(newVehicle)
            });
        })
    }

     updateVehicle(vehicle, id) {
        
        db.run("UPDATE Vehicle SET placa = ?, chassi = ?, renavam = ?, modelo = ?, marca = ?, ano = ? WHERE id = ?", [vehicle._placa, vehicle._chassi, vehicle._renavam, vehicle._modelo, vehicle._marca, vehicle._ano, id])
    }

     deleteVehicle(id) {
        db.get("DELETE FROM Vehicle WHERE id=?", [id]);
    }
}
