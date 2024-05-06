import express, { Router } from "express";
import router from "./routes.js";
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./swagger.json" with { type: "json"}
import { errorMiddleware } from "./middlewares/error.handling.js";
import { createTable } from "./database/db.config.js";

const PORT = 8080;
export const app = express();
createTable();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(router)
app.use(errorMiddleware)
app.listen(PORT, () => {
    console.log("Aplicação rodando na URL http://localhost:8080/");
})