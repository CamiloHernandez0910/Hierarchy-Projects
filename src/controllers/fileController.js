import { processZip } from "../services/fileService.js";

let lastFileStructure = {}; // Para almacenar la última estructura procesada

export const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No se subió ningún archivo." });
        }

        lastFileStructure = processZip(req.file.path);
        res.status(200).json(lastFileStructure);
    } catch (error) {
        res.status(500).json({ message: "Error al procesar el archivo.", error: error.message });
    }
};

export const getFileStructure = (req, res) => {
    if (!Object.keys(lastFileStructure).length) {
        return res.status(400).json({ message: "No hay archivos procesados aún." });
    }
    res.status(200).json(lastFileStructure);
};
