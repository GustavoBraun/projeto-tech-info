import express, { Router } from "express";
import createTable from "./entity/Veiculo.js";
import router from "./routes.js";

const PORT = 8080;
const app = express();
app.use(router)
app.use(express.json());

createTable();
app.listen(PORT)