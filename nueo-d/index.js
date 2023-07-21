import express from 'express';
import connectDB from './db.js';
import authRouter from './wmorocho/ruteadores/authRouter.js';
import empleadoRouter from './wmorocho/ruteadores/empleadoRouter.js';
import autenticacionMiddleware from './wmorocho/middleware/autenticacionMeddleware.js';


const app = express();
const port = 3000;

connectDB();

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/empleados', autenticacionMiddleware, empleadoRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});