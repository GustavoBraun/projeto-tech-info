import express, { Router } from "express";
import router from "./routes.js";
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./swagger.json" with { type: "json"}
import { errorMiddleware } from "./middlewares/error.handling.js";
import { createTable } from "./database/db.config.js";
import cors from 'cors';

// Declarando porta em que será rodada a aplicação
const PORT = 8080;

// Gerando servidor e também exportando para utilizar nos testes
export const app = express();

// Gerando banco de dados
createTable();

// Configurando cors para permitir requisição externa
app.use(cors())

// Configurando Json
app.use(express.json());

// Configurando swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Configurando rotas no arquivo routes.js
app.use(router)

// Configurando middleware de erro
app.use(errorMiddleware)

// Iniciando servidor
app.listen(PORT, () => {
    console.log("Aplicação rodando na URL http://localhost:8080/");
})
