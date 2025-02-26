import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fileRoutes from "./src/routes/fileRoutes.js";
import swaggerUi from "swagger-ui-express";
import fs from "fs";

// Leer el archivo swagger.json
const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json", "utf8"));

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/files", fileRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📖 Swagger docs at http://localhost:${PORT}/api-docs`);
});
