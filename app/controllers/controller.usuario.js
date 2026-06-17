// --------------------------
// IMPORTACIÓN DE LA CONEXIÓN
// --------------------------

// Importa la conexión con la base de datos
import conexion from "../config/database.js";

// --------------------------
// OBTENER TODOS LOS USUARIOS
// --------------------------

// Esta función consulta todos los usuarios registrados
export const listarUsuarios = async (req, res) => {

    try {

        // Consulta SQL para obtener todos los usuarios
        const [usuarios] = await conexion.query(
            "SELECT * FROM usuarios"
        );

        // Devuelve los usuarios en formato JSON
        res.json(usuarios);

    } catch (error) {

        // Si ocurre un error, devuelve el mensaje
        res.status(500).json({
            error: error.message
        });

    }

};

// ----------------------------
// REGISTRAR UN NUEVO USUARIO
// ----------------------------

// Esta función registra un usuario en la base de datos
export const crearUsuario = async (req, res) => {

    try {

        // Obtiene los datos enviados desde Thunder Client
        const {
            nombre,
            apellido,
            documento,
            correo,
            contraseña,
            rol
        } = req.body;

        // Ejecuta la consulta SQL para insertar el usuario
        const [resultado] = await conexion.query(

            `INSERT INTO usuarios
            (nombre, apellido, documento, correo, contraseña, rol)
            VALUES (?, ?, ?, ?, ?, ?)`,

            [
                nombre,
                apellido,
                documento,
                correo,
                contraseña,
                rol
            ]

        );

        // Respuesta cuando el registro fue exitoso
        res.status(201).json({

            mensaje: "Usuario registrado correctamente",

            id: resultado.insertId

        });

    } catch (error) {

        // Si ocurre un error devuelve el mensaje
        res.status(500).json({

            error: error.message

        });

    }

};

// -----------------------
// OBTENER USUARIO POR ID
// -----------------------

// Busca un usuario utilizando su ID
export const obtenerUsuario = async (req, res) => {

    try {

        const { id } = req.params;

        const [usuario] = await conexion.query(
            "SELECT * FROM usuarios WHERE id = ?",
            [id]
        );

        if (usuario.length === 0) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        res.json(usuario[0]);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

// -------------------
// ACTUALIZAR USUARIO
// -------------------

// Actualiza la información de un usuario
export const actualizarUsuario = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            nombre,
            apellido,
            documento,
            correo,
            contraseña,
            rol
        } = req.body;

        await conexion.query(

            `UPDATE usuarios
            SET nombre = ?, apellido = ?, documento = ?, correo = ?, contraseña = ?, rol = ?
            WHERE id = ?`,

            [
                nombre,
                apellido,
                documento,
                correo,
                contraseña,
                rol,
                id
            ]

        );

        res.json({
            mensaje: "Usuario actualizado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

// -----------------
// ELIMINAR USUARIO
// -----------------

// Elimina un usuario de la base de datos
export const eliminarUsuario = async (req, res) => {

    try {

        const { id } = req.params;

        await conexion.query(
            "DELETE FROM usuarios WHERE id = ?",
            [id]
        );

        res.json({
            mensaje: "Usuario eliminado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};