import Empleado from'../modelos/Empleado.js';

// Controlador para obtener todos los empleados con sueldo distinto de cero
export const obtenerEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find({ sueldo: { $ne: 0 } });
    res.status(200).json(empleados);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener empleados' });
  }
};

// Controlador para obtener los detalles de un empleado específico
export const obtenerEmpleado = async (req, res) => {
  const { id } = req.params;

  try {
    const empleado = await Empleado.findOne({ $or: [{ _id: id }, { nombre: id }], sueldo: { $gte: 500, $lte: 1000 } });
    if (!empleado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }
    res.status(200).json(empleado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener empleado' });
  }
};

// Controlador para crear un nuevo empleado
export const crearEmpleado = async (req, res) => {
  const { nombre, cedula, cargo, sueldo } = req.body;

  try {
    // Calcular el sueldo aumentado un 10%
    const sueldoAumentado = sueldo * 1.1;

    // Crear un nuevo empleado en la base de datos
    const nuevoEmpleado = new Empleado({ nombre, cedula, cargo, sueldo: sueldoAumentado });
    await nuevoEmpleado.save();

    res.status(201).json(nuevoEmpleado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear empleado' });
  }
};

// Controlador para actualizar los detalles de un empleado existente
export const actualizarEmpleado = async (req, res) => {
  const { id } = req.params;
  const { cargo, sueldo } = req.body;

  try {
    const empleado = await Empleado.findOneAndUpdate({ $or: [{ _id: id }, { nombre: id }] }, { cargo, sueldo }, { new: true });
    if (!empleado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }
    res.status(200).json(empleado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar empleado' });
  }
};

// Controlador para eliminar un empleado
export const eliminarEmpleado = async (req, res) => {
  const { id } = req.params;

  try {
    const empleado = await Empleado.findOneAndDelete({ $or: [{ _id: id }, { nombre: id }] });
    if (!empleado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }
    res.status(200).json({ mensaje: 'Empleado eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar empleado' });
  }
};