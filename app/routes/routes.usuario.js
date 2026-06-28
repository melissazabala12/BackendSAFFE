// -------------------------
// IMPORTACIÓN DE LIBRERÍAS
// -------------------------

// Importa Router de Express
import { Router } from "express";

// Importación de controladores
import {
    listarUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    obtenerPerfil 
} from "../controllers/controller.usuario.js";

// Middleware de autenticación
import { verificarToken } from "../middleware/auth.middleware.js";

// -------------------------
// CREAR ROUTER
// -------------------------

const router = Router();

// -------------------------
// RUTAS USUARIOS
// -------------------------

// Obtener perfil del usuario logueado (Debe ir antes de /usuarios/:id para evitar conflictos)
router.get("/perfil", verificarToken, obtenerPerfil);

// Obtener todos los usuarios
router.get("/usuarios", verificarToken, listarUsuarios);

// Obtener usuario por ID
router.get("/usuarios/:id", verificarToken, obtenerUsuario);

// Crear usuario
router.post("/usuarios", verificarToken, crearUsuario);

// Actualizar usuario
router.put("/usuarios/:id", verificarToken, actualizarUsuario);

// Eliminar usuario
router.delete("/usuarios/:id", verificarToken, eliminarUsuario);

// Exportar router
export default router;