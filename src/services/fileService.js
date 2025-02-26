import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";

const IGNORED_FOLDERS = ["node_modules", ".git", "venv", "__pycache__", ".pytest_cache"];

const getStructure = (dirPath) => {
    let structure = {};
    fs.readdirSync(dirPath).forEach(file => {
        const fullPath = path.join(dirPath, file);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            if (IGNORED_FOLDERS.includes(file)) {
                structure[file] = "📂 [Contenido oculto]";
            } else {
                structure[file] = getStructure(fullPath);
            }
        } else {
            structure[file] = { size: `${(stats.size / 1024).toFixed(2)} KB`, lastModified: stats.mtime };
        }
    });
    return structure;
};

// Función para eliminar una carpeta de forma recursiva
const deleteFolderRecursive = (folderPath) => {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach(file => {
            const curPath = path.join(folderPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(folderPath);
    }
};

export const processZip = (zipPath) => {
    const unzipPath = path.join("uploads", path.basename(zipPath, ".zip"));

    if (!fs.existsSync(unzipPath)) {
        fs.mkdirSync(unzipPath, { recursive: true });
    }

    const zip = new AdmZip(zipPath);
    const zipEntries = zip.getEntries();

    if (zipEntries.length === 0) {
        console.log("❌ El archivo ZIP está vacío o no se puede leer.");
        throw new Error("El archivo ZIP está vacío.");
    }

    zip.extractAllTo(unzipPath, true);
    console.log(`✅ Archivos extraídos en: ${unzipPath}`);

    const extractedFiles = fs.readdirSync(unzipPath);
    console.log("📂 Archivos extraídos:", extractedFiles);

    let targetPath = unzipPath;
    if (extractedFiles.length === 1 && fs.statSync(path.join(unzipPath, extractedFiles[0])).isDirectory()) {
        targetPath = path.join(unzipPath, extractedFiles[0]); // Usa la carpeta raíz si solo hay una
    }

    const structure = getStructure(targetPath);
    console.log("📜 Estructura generada:", structure);

    // Eliminar ZIP y carpeta descomprimida
    fs.unlinkSync(zipPath); 
    deleteFolderRecursive(unzipPath); 

    return structure;
};
