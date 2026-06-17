// --------------
// IMPORTACIONES
// --------------

import conexion from "../config/database.js";
import jwt from "jsonwebtoken";

// Clave secreta para generar el token
const SECRET = "mi_clave_super_secreta";

// ------
// LOGIN
// ------

export const login = async (req, res) => {

    try {

        const { correo, contraseña } = req.body;

        // Busca el usuario por correo
        const [usuarios] = await conexion.query(

            "SELECT * FROM usuarios WHERE correo = ?",

            [correo]

        );

        // Verifica si el usuario existe
        if (usuarios.length === 0) {

            return res.status(401).json({

                mensaje: "Correo no registrado"

            });

        }

        const usuario = usuarios[0];

        // Verifica la contraseña
        if (usuario.contraseña !== contraseña) {

            return res.status(401).json({

                mensaje: "Contraseña incorrecta"

            });

        }

        // Genera el token
        const token = jwt.sign(

            {
                id: usuario.id,
                correo: usuario.correo
            },

            SECRET,

            {
                expiresIn: "2h"
            }

        );

        // Devuelve el token
        res.json({

            mensaje: "Inicio de sesión correcto",

            token

        });

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

};