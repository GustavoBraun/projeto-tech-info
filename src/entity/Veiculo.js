import { openDb } from "../database/dbConfig.js"

export default async function createTable() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Veiculo (id INTEGER PRIMARY KEY, placa TEXT, chassi TEXT, renavam INTEGER, modelo TEXT, marca TEXT, ano TEXT)')
    }) 
};