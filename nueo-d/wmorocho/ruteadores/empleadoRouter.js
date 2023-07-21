import express from 'express';
import  * as empleadoController from '../controladores/empleadosController.js';
import autenticacionMiddleware from '../middleware/autenticacionMeddleware.js';

const router = express.Router();

router.get('/', autenticacionMiddleware, empleadoController.obtenerEmpleados);
router.get('/:id', autenticacionMiddleware, empleadoController.obtenerEmpleado);
router.post('/', autenticacionMiddleware, empleadoController.crearEmpleado);
router.patch('/:id', autenticacionMiddleware, empleadoController.actualizarEmpleado);
router.delete('/:id', autenticacionMiddleware, empleadoController.eliminarEmpleado);

export default router;