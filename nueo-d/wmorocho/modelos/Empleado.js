import mongoose from'mongoose';

const empleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cedula: { type: String, required: true },
  cargo: { type: String, required: true },
  sueldo: { type: Number, required: true },
});

const Empleado = mongoose.model('Empleado', empleadoSchema);

export default Empleado;