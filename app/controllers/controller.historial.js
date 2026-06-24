import conexion from "../config/database.js";

// ----------------------------
// OBTENER HISTORIAL DE ACCESOS
// ----------------------------

export const obtenerHistorial = async (req, res) => {

    try {

        const [historial] = await conexion.query(

            `SELECT

                usuarios.id,
                usuarios.nombre,
                usuarios.apellido,

                accesos.fecha,
                accesos.hora,
                accesos.estado,
                accesos.lugar

            FROM accesos

            INNER JOIN usuarios

            ON usuarios.id = accesos.usuario_id

            ORDER BY accesos.fecha DESC,
            accesos.hora DESC`

        );

        res.json(historial);

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

};
