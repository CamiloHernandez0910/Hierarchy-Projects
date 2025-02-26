import express from "express";
import { uploadFile, getFileStructure } from "../controllers/fileController.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/files/upload:
 *   post:
 *     summary: Sube un archivo ZIP y devuelve su estructura en JSON.
 *     tags: [Files]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         required: true
 *         description: Archivo ZIP a subir.
 *     responses:
 *       200:
 *         description: Estructura del proyecto en JSON.
 *       400:
 *         description: Error en la subida.
 */
router.post("/upload", upload.single("file"), uploadFile);

export default router;
