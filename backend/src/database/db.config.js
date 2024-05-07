import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export const db = new sqlite3.Database('./src/database/vehicles.db', (err) => {
  if (err) {
    console.error(err.message);
  }
});

export function createTable() {
  db.exec('CREATE TABLE IF NOT EXISTS Vehicle (id INTEGER PRIMARY KEY, placa TEXT, chassi TEXT, renavam INTEGER, modelo TEXT, marca TEXT, ano INTEGER)');
}  
