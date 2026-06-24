// ------------------
// IMPORTAR CONEXIÓN
// ------------------

import conexion from "../config/database.js";

// --------------------------
// REGISTRAR UN NUEVO ACCESO
// --------------------------

export const registrarAcceso = async (req, res) => {

    try {

        const {

            usuario_id,
            lugar,
            estado,
            observacion

        } = req.body;

        const fecha = new Date().toISOString().split("T")[0];

        const hora = new Date().toTimeString().split(" ")[0];

        const [resultado] = await conexion.query(

            `INSERT INTO accesos
            (usuario_id, fecha, hora, lugar, estado, observacion)
            VALUES (?, ?, ?, ?, ?, ?)`,

            [

                usuario_id,
                fecha,
                hora,
                lugar,
                estado,
                observacion

            ]

        );

        res.status(201).json({

            mensaje: "Acceso registrado correctamente",

            id: resultado.insertId

        });

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

};

// ---------------
// LISTAR ACCESOS
// ---------------

export const listarAccesos = async (req, res) => {

    try {

        const [accesos] = await conexion.query(

            `SELECT
            accesos.*,
            usuarios.nombre,
            usuarios.apellido
            FROM accesos
            INNER JOIN usuarios
            ON usuarios.id = accesos.usuario_id`

        );

        res.json(accesos);

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

};

// --------------------------
// CONSULTAR ACCESO POR ID
// --------------------------

export const obtenerAcceso = async (req, res) => {

    try {

        const { id } = req.params;

        const [acceso] = await conexion.query(

            "SELECT * FROM accesos WHERE id=?",

            [id]

        );

        if (acceso.length === 0) {

            return res.status(404).json({

                mensaje: "Acceso no encontrado"

            });

        }

        res.json(acceso[0]);

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

};