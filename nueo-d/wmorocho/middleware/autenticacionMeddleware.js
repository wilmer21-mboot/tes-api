// middleware/autenticacionMiddleware.js
import jwt from'jsonwebtoken';

const autenticacionMiddleware = (req, res, next) => {
const token = req.header('Authorization');

if (!token) {
return res.status(404).json({ message: 'No se proporcionó un token de autenticación' });
}

try {
const decoded = jwt.verify(token, 'secretKey');
req.usuario = decoded.usuario;
next();
} catch (error) {
console.error('Error al verificar el token:', error);
res.status(500).json({ message: 'Token de autenticación inválido' });
}
};

export default autenticacionMiddleware;