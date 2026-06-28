// --------------
// IMPORTACIONES
// --------------
import jwt from "jsonwebtoken";

// Clave secreta utilizada para validar el token
const SECRET = "mi_clave_super_secreta";

// ---------------
// VERIFICAR TOKEN
// ---------------
export const verificarToken = (req, res, next) => {
    // Obtiene el token del encabezado Authorization
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            mensaje: "Acceso denegado. Token no proporcionado."
        });
    }

    try {
        // Elimina la palabra Bearer
        const tokenLimpio = token.replace("Bearer ", "");

        // VERIFICACIÓN: Verificamos y GUARDAMOS el contenido del token
        const decoded = jwt.verify(tokenLimpio, SECRET);
        
        //  el controlador puede hacer: const id = req.usuario.id;
        req.usuario = decoded; 

        // Continúa con la siguiente función
        next();
    } catch (error) {
        res.status(401).json({
            mensaje: "Token inválido"
        });
    }
};