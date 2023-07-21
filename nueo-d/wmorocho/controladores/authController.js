import jwt from'jsonwebtoken';
import Usuario from'../modelos/Usuario.js';

// Controlador para registrar un nuevo usuario
export const registrarUsuario = async (req, res) => {
  const { nombreUsuario, correoElectronico, contraseña } = req.body;

  try {
    //Verificar si el usuario ya existe en la base de datos
    const usuarioExistente = await Usuario.findOne({ correoElectronico });
    if (!usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario en la base de datos
    const nuevoUsuario = new Usuario({ nombreUsuario, correoElectronico, contraseña });
    await nuevoUsuario.save();

    // Generar un token JWT válido
    const token = jwt.sign({ userId: nuevoUsuario._id }, 'tu_secreto');

    res.status(200).json({ token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
};

// Controlador para iniciar sesión
export const iniciarSesion = async (req, res) => {
  const { nombreUsuario, contraseña } = req.body;

  try {
    // Verificar las credenciales del usuario
    const usuario = await Usuario.findOne({ nombreUsuario });
    if (!usuario || usuario.contraseña !== contraseña) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Generar un token JWT válido
    const token = jwt.sign({ usuarioId: usuario._id }, 'tu_secreto');

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
};