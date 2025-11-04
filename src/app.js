import express from 'express';
import cors from 'cors';
import  authRoutes from './routes/auth.routes.js';
import usuarioRoutes from './routes/usuarios.routes.js'
import habitoRoutes from './routes/habitos.routes.js'
import rutinaRoutes from './routes/rutinas.routes.js'
import progresoRoutes from './routes/progreso.routes.js'
import tareasRoutes from './routes/tareas.routes.js'
import alertasRoutes from './routes/alertas.routes.js'
import usoRoutes from './routes/uso.routes.js'


const app = express();
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials:true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', habitoRoutes);
app.use('/api', rutinaRoutes);
app.use('/api', progresoRoutes);
app.use('/api', tareasRoutes);
app.use('/api', alertasRoutes);
app.use('/api', usoRoutes);

app.use((req, resp, next) => {
  resp.status(404).json({
    message: 'Endpoint not found',
  });
});

export default app;