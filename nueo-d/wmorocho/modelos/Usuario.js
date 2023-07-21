import { Schema, model} from'mongoose';

const usuarioSchema = new Schema({
  nombreUsuario: { type: String, required: true },
  correoElectronico: { type: String, required: true },
  contraseña: { type: String, required: true },
});

const Usuario = model('Usuario', usuarioSchema);

export default Usuario;