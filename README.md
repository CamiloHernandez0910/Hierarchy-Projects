# 📁 Proyecto: Mapeo de Estructura de Archivos

Este proyecto permite a los usuarios subir un archivo `.zip` con un proyecto y obtener su estructura en formato JSON. Además, ignora carpetas pesadas como `node_modules`, `.git`, entre otras, para mejorar el rendimiento.

## 🚀 Características
- 📂 Extrae y analiza la estructura de un proyecto desde un `.zip`
- 🚫 Ignora carpetas como `node_modules`, `.git`, `venv`, etc.
- 📜 Devuelve la estructura del proyecto en formato JSON
- 🗑️ Elimina automáticamente el ZIP y la carpeta descomprimida
- 🛠️ Documentado con Swagger para facilitar el uso de la API

## 🏗️ Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/CamiloHernandez0910/Hierarchy-Projects.git
   cd Hierarchy-Projects
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

## ▶️ Uso

1. Inicia el servidor:
   ```bash
   node index.js
   ```
2. Abre la documentación de la API en tu navegador:
   ```
   http://localhost:5001/api/docs
   ```
3. Realiza una petición `POST` a la ruta `/api/files/upload` enviando un archivo `.zip`.

## 📡 Endpoints

### `POST /api/files/upload`
- **Descripción**: Sube un archivo `.zip` y devuelve su estructura en JSON.
- **Parámetros**:
  - `file`: Archivo ZIP a analizar (formato `multipart/form-data`).
- **Ejemplo de respuesta**:
  ```json
  {
    "src": {
      "controllers": {
        "controller1.js": { "size": "4.2 KB", "lastModified": "2024-02-25T12:00:00Z" },
        "controller2.js": { "size": "5.1 KB", "lastModified": "2024-02-24T18:30:00Z" }
      },
      "node_modules": "📂 [Contenido oculto]"
    }
  }
  ```

## ⚙️ Configuración
Puedes personalizar las carpetas ignoradas modificando el array `IGNORED_FOLDERS` en `fileService.js`:
```javascript
const IGNORED_FOLDERS = ["node_modules", ".git", "venv", "__pycache__"];
```

## 👨‍💻 Contribuciones
¡Las contribuciones son bienvenidas! Por favor, sigue estos pasos:
1. Haz un **fork** del repositorio
2. Crea una nueva rama (`git checkout -b feature-nueva`)
3. Realiza los cambios y haz **commit** (`git commit -m 'Agrega nueva funcionalidad'`)
4. Haz **push** a tu rama (`git push origin feature-nueva`)
5. Abre un **Pull Request**

---
**Desarrollado con ❤️ por [HERTUQ](https://github.com/CamiloHernandez0910)** 🚀



