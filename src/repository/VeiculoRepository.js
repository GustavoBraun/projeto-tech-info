import { openDb } from "../database/dbConfig.js";

export class VeiculoRepository {
    async getVeiculos() {
        const db = await openDb();
        const res = await db.all("SELECT * FROM Veiculo");
        db.close()
        return res;
    }

    async getVeiculo(req) {
        const db = await openDb();
        const res = await db.get("SELECT * FROM Veiculo WHERE id=?", [req.id]);
        db.close();
        return res;
    }

    async insertVeiculo(veiculo) {
        const db = await openDb();
        db.run("INSERT INTO Veiculo (placa, chassi, renavam, modelo, marca, ano) VALUES (?, ?, ?, ?, ?, ?)", [veiculo.placa, veiculo.chassi, veiculo.renavam, veiculo.modelo, veiculo.marca, veiculo.ano]);
        db.close();
    }

    async updateVeiculo(veiculo, param) {
        const db = await openDb();
        db.run("UPDATE Veiculo SET placa = ?, chassi = ?, renevam = ?, modelo = ?, marca = ?, ano = ? WHERE id = ?", [veiculo.placa, veiculo.chassi, veiculo.renavam, veiculo.modelo, veiculo.marca, veiculo.ano, param.id])
        db.close();
    }

    async deleteVeiculo(req) {
        const db = await openDb();
        const res = await db.get("DELETE FROM Veiculo WHERE id=?", [req.id]);
        db.close();
        return res;
    };
}
