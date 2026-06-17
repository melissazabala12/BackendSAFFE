// -------------------------
// IMPORTACIÓN DE LIBRERÍAS
// -------------------------

// Importa Router de Express
import { Router } from "express";

// Importa los controladores
import {

    listarUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario

} from "../controllers/controller.usuario.js";

import { verificarToken } from "../middleware/auth.middleware.js";

// Crea el router
const router = Router();

// ------
// RUTAS
// ------

// Obtener todos
router.get("/usuarios", verificarToken, listarUsuarios);

// Obtener uno
router.get("/usuarios/:id", verificarToken, obtenerUsuario);

// Crear
router.post("/usuarios", verificarToken, crearUsuario);

// Actualizar
router.put("/usuarios/:id", verificarToken, actualizarUsuario);

// Eliminar
router.delete("/usuarios/:id", verificarToken, eliminarUsuario);
