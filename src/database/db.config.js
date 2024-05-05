import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export const db = new sqlite3.Database('./src/database/veiculos.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the veiculos database.');
});

export function createTable() {
  db.exec('CREATE TABLE IF NOT EXISTS Veiculo (id INTEGER PRIMARY KEY, placa TEXT, chassi TEXT, renavam INTEGER, modelo TEXT, marca TEXT, ano INTEGER)');
}  
