import  {Router } from 'express';
import * as authController from '../controladores/authController.js';

const router = Router();
router.post('/register', authController.registrarUsuario);
router.post('/login', authController.iniciarSesion);

export default router;