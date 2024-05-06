import { db } from "../database/db.config.js";
import Veiculo from "../entity/veiculo.entity.js";

export class VeiculoRepository {
    getVeiculos() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM Veiculo",[], (err, rows) =>{
                if (err) {
                    reject(err)
                }
                resolve(rows)
            });
        })
    }

     getVeiculo(id) {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM Veiculo WHERE id=?", [id], (err, rows) =>{
                if (err) {
                    reject(err)
                }
                resolve(rows)
            });
            
        })
    }

    createVeiculo(obj) {
        const veiculo = new Veiculo(obj.placa, obj.chassi, obj.renavam, obj.modelo, obj.marca, obj.ano);
        return veiculo;
    }

     saveVeiculo(veiculo) {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO Veiculo (placa, chassi, renavam, modelo, marca, ano) VALUES (?, ?, ?, ?, ?, ?)", [veiculo._placa, veiculo._chassi, veiculo._renavam, veiculo._modelo, veiculo._marca, veiculo._ano], function(err) {
                if (err) {
                    reject(err)
                };
                const novoVeiculo = {
                    _id : this.lastID,
                    _placa : veiculo._placa,
                    _chassi : veiculo._chassi,
                    _renavam : veiculo._renavam,
                    _modelo : veiculo._modelo,
                    _marca : veiculo._marca,
                    _ano : veiculo._ano
                }
                resolve(novoVeiculo)
            });
        })
    }

     updateVeiculo(veiculo, id) {
        
        db.run("UPDATE Veiculo SET placa = ?, chassi = ?, renavam = ?, modelo = ?, marca = ?, ano = ? WHERE id = ?", [veiculo._placa, veiculo._chassi, veiculo._renavam, veiculo._modelo, veiculo._marca, veiculo._ano, id])
    }

     deleteVeiculo(id) {

        const res =  db.get("DELETE FROM Veiculo WHERE id=?", [id]);
    }
}
