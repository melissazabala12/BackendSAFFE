// --------------------------
// IMPORTACIÓN DE LA CONEXIÓN
// --------------------------
import conexion from "../config/database.js";

// --------------------------
// OBTENER PERFIL DEL USUARIO (NUEVA)
// --------------------------
// Esta función usa el ID del token para devolver los datos del usuario actual
export const obtenerPerfil = async (req, res) => {
    try {
        // El middleware verificarToken debe inyectar el 'id' en req.usuario
        const id = req.usuario.id; 
        
        const [usuarios] = await conexion.query(
            "SELECT nombre, apellido, rol FROM usuarios WHERE id = ?",
            [id]
        );

        if (usuarios.length === 0) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.json(usuarios[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// --------------------------
// OBTENER TODOS LOS USUARIOS
// --------------------------
export const listarUsuarios = async (req, res) => {
    try {
        const [usuarios] = await conexion.query("SELECT * FROM usuarios");
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ----------------------------
// REGISTRAR UN NUEVO USUARIO
// ----------------------------
export const crearUsuario = async (req, res) => {
    try {
        const { nombre, apellido, documento, correo, contraseña, rol } = req.body;
        const [resultado] = await conexion.query(
            `INSERT INTO usuarios (nombre, apellido, documento, correo, contraseña, rol) VALUES (?, ?, ?, ?, ?, ?)`,
            [nombre, apellido, documento, correo, contraseña, rol]
        );
        res.status(201).json({ mensaje: "Usuario registrado correctamente", id: resultado.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// -----------------------
// OBTENER USUARIO POR ID
// -----------------------
export const obtenerUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const [usuario] = await conexion.query("SELECT * FROM usuarios WHERE id = ?", [id]);
        if (usuario.length === 0) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json(usuario[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// -------------------
// ACTUALIZAR USUARIO
// -------------------
export const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, documento, correo, contraseña, rol } = req.body;
        await conexion.query(
            `UPDATE usuarios SET nombre = ?, apellido = ?, documento = ?, correo = ?, contraseña = ?, rol = ? WHERE id = ?`,
            [nombre, apellido, documento, correo, contraseña, rol, id]
        );
        res.json({ mensaje: "Usuario actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// -----------------
// ELIMINAR USUARIO
// -----------------
export const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await conexion.query("DELETE FROM usuarios WHERE id = ?", [id]);
        res.json({ mensaje: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};